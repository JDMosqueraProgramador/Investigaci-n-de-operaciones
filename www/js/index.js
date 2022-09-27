const getByID = (id) => document.querySelector(`#${id}`);

document.addEventListener("DOMContentLoaded", (e) => {
    "estrict mode"

    let data = {}

    const form = document.querySelector("#dateform1")

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        jsonData = JSON.stringify(Object.fromEntries(formData))

        let matrix = []

        for (let i = 0; i < 3; i++) {
            matrix[i] = []
            for (let j = 0; j < 2; j++) {
                let input = document.getElementsByName(`d${i + 1}-s${j + 1}`)[0];
                matrix[i].push(parseFloat(input.value));
            }

        }

        let probabilities = [parseFloat(formData.get('p-s1')), parseFloat(formData.get('p-s2'))]

        let depends_probabilities = [
            [
                parseFloat(document.getElementsByName(`pf-s1`)[0].value),
                parseFloat(document.getElementsByName(`pu-s1`)[0].value)
            ],
            [
                parseFloat(document.getElementsByName(`pf-s2`)[0].value),
                parseFloat(document.getElementsByName(`pu-s2`)[0].value)
            ]
        ]

        data = {
            matrix,
            probabilities,
            depends_probabilities
        }

        fetch('http://127.0.0.1:8000/decisions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                addTrWithData(data.optimista, data.conservador);
                interactTr(data.maximo_arrepentimiento, 'max-regret', false);
                interactTr(data.evidencias.map((evidence, i) => {
                    return [
                        getEquation(
                            parseFloat(formData.get('p-s1')),
                            parseFloat(formData.get('p-s2')),
                            matrix[i][0],
                            matrix[i][1]
                        ),
                        evidence
                    ]
                }), 'evidences', false);

                interactTr(data.evidencias_maximo_arrepentimiento.map((evidence, i) => {
                    return [
                        getEquation(
                            parseFloat(formData.get('p-s1')),
                            parseFloat(formData.get('p-s2')),
                            data.maximo_arrepentimiento[i][0],
                            data.maximo_arrepentimiento[i][1]
                        ),
                        evidence
                    ]
                }), 'evidences-max', false);

                getByID('awaited-value').innerHTML = data.ve.toFixed(2);
                getByID('aditional-awaited-value').innerHTML = data.vea.toFixed(2);
                getByID('awaited-value-max').innerHTML = data.vea_maximo_arrepentimiento.toFixed(2);
                getByID('prob-success').innerHTML = data.probabilidad_favorable.toFixed(2);
                getByID('prob-fail').innerHTML = data.probabilidad_desfavorable.toFixed(2);
                getByID('veod-result').innerHTML = data.veod.toFixed(2);
                getByID('ive-result').innerHTML = data.incrento_valor_esperado.toFixed(3);
                getByID('eficiencia-result').innerHTML = data.eficiencia.toFixed(3) * 100 + "%";

                let ocurrence = data.probabilidad_ocurrencia.map((prob, i) => {
                    let number = (i < 2 == 1) ? '1' : '2';
                    let letter = (i % 2 == 0) ? 'f' : 'u';

                    return [`Ps${number}/${letter}`, prob.toFixed(4)]
                })

                interactTr(ocurrence, 'prob-ocurrence', false);
                
                console.log(data.puntos);
                createChart(data.puntos);
                drawTree(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })

})

const createElement = (element) => document.createElement(element);
const addNode = (element, node) => element.appendChild(node);

const addTrWithData = (dataOne, dataTwo) => {
    for (let i = 0; i < dataOne.length; i++) {
        createTrAndTd([dataOne[i], dataTwo[i]], 'optmist-and-conservative')
    }
}

const createTrAndTd = (data, id) => {
    let tr = createElement('tr');

    data.forEach(data => {
        let td = createElement('td');
        td.innerHTML = isNum(data) ? parseFloat(data).toFixed(2) : data;

        addNode(tr, td);
    })

    addNode(document.querySelector("#" + id), tr)
}

const interactTr = (source, id, dataInArray = true) => {
    source.forEach(data => {
        createTrAndTd((dataInArray ? [data] : data), id)
    })
}

const getEquation = (probSuccess, probFail, altSuccess, altFail) => {
    return `(${probSuccess}) * (${altSuccess}) + (${probFail}) * (${altFail})`;
}

const isNum = (val) => {
    return !isNaN(val)
}
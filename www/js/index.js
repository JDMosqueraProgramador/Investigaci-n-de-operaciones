
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
                interactTr(data.evidencias, 'evidences');
                interactTr(data.evidencias_maximo_arrepentimiento, 'evidences-max');

                getByID('awaited-value').innerHTML = data.ve;
                getByID('aditional-awaited-value').innerHTML = data.vea;
                getByID('awaited-value-max').innerHTML = data.vea_maximo_arrepentimiento;
                getByID('prob-success').innerHTML = data.probabilidad_favorable;
                getByID('prob-fail').innerHTML = data.probabilidad_desfavorable;
                getByID('veod-result').innerHTML = data.veod;

                let ocurrence = data.probabilidad_ocurrencia.map((prob, i) => {
                    let number = (i < 2) ? '1' : '2';
                    let letter = (i % 2 == 0) ? 'f' : 'u';

                    return [`Ps${number}/${letter}`, prob]
                })

                interactTr(ocurrence, 'prob-ocurrence', false);
                
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
        td.innerHTML = data;

        addNode(tr, td);
    })

    addNode(document.querySelector("#" + id), tr)
}

const interactTr = (source, id, dataInArray = true) => {
    source.forEach(data => {
        createTrAndTd((dataInArray ? [data] : data), id)
    })
}

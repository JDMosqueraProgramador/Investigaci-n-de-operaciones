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
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })



})
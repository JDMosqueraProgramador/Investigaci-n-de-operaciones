document.addEventListener("DOMContentLoaded", () => {

    const shapeInput = document.querySelector("#matrix-shape");
    const shapeLabel = document.querySelector("#label-shape");
    const matrix = document.querySelector("#matrix");
    const button = document.querySelector("#calculate");
    let shape = parseInt(shapeInput.value);

    createTable(shape, matrix);
    shapeInput.addEventListener("input", () => {
        shapeLabel.innerHTML = shapeInput.value;
        shape = parseInt(shapeInput.value);
        createTable(shapeInput.value, matrix);
    });

    button.addEventListener("click", (e) => {
        let inputs = matrix.querySelectorAll("input:not([readonly])");
        let minAndMax = matrix.querySelectorAll("input[readonly]");
        let newInputs = [];
        let maxCol = [];
        let minRow = [];
        let pos = 0;

        for (let i = 0; i < shape; i++) newInputs.push([]);

        inputs.forEach((input, i) => {
            if (i % shape == 0 && i > 0) pos++;
            newInputs[pos].push(input);
        });

        for (let i = 0; i < shape; i++) {
            minRow.push(getMinFromRow(i, shape, newInputs));
            maxCol.push(getMaxFromColumn(i, shape, newInputs));
            minAndMax[i].value = minRow[i];
            minAndMax[i + shape].value = maxCol[i];
        }
    });
});

const getMaxFromColumn = (col, number, inputs) => {
    let max = inputs[0][col].value;
    for (let i = 0; i < number; i++) {
        if (inputs[i][col].value > max) max = inputs[i][col].value;
    }

    return max;
}

const getMinFromRow = (row, number, inputs) => {
    let min = inputs[row][0].value;
    for (let i = 0; i < number; i++) {
        if (inputs[row][0].value < min) min = inputs[row][0].value;
    }

    return min;
}

const setItemStyle = (div) => {
    div.style.width = "60px";
    div.style.height = "40px";
    div.style.textAlign = "center";
    div.classList.add("m-1");
    div.classList.add("d-flex");
    div.classList.add("justify-content-center");
    div.classList.add("align-items-center");
}

const createInput = (name, readonly = false) => {
    let input = document.createElement("input");
    input.type = "number";
    input.name = name;
    input.readOnly = readonly;
    input.disabled = readonly;
    setItemStyle(input);
    return input;
}

const createStateIndicator = (name) => {
    let div = document.createElement("div");
    div.innerHTML = name;
    setItemStyle(div);

    return div;
}

const createRow = () => {
    let row = document.createElement("div");
    row.classList.add("d-flex");
    return row;

}

const createTable = (number, matrix) => {

    matrix.innerHTML = "";

    matrix.appendChild(createRowTop(number));
    createInputs(number).forEach(row => {
        matrix.append(row);
    });

    matrix.appendChild(createRowBottom(number));

}

const createInputs = (number) => {
    const matrix = [];

    for (let i = 0; i < number; i++) {
        const row = createRow();
        row.appendChild(createStateIndicator("S" + i));

        for (let j = 0; j < number; j++) {
            row.appendChild(createInput(`mi-${i}-${j}`));
        }

        row.appendChild(createInput("col-" + i, true));
        matrix.push(row);
    }

    return matrix;
}

const createRowTop = (number) => {
    const topRow = createRow();
    topRow.appendChild(createStateIndicator(""));

    for (let i = 0; i < number; i++) {
        topRow.appendChild(createStateIndicator("S" + i))
    }

    topRow.appendChild(createStateIndicator("Min fila"));

    return topRow;
}

const createRowBottom = (number) => {
    const bottomRow = createRow();
    bottomRow.appendChild(createStateIndicator("Max col"));

    for (let i = 0; i < number; i++) {
        bottomRow.appendChild(createInput("row-" + i, true));
    }

    return bottomRow;
}


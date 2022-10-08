const createChart = (data) => {

    let newData = []
    data.forEach(points => {
        newData.push(
            points.map(point => {
                return {
                    x: point[0], y: point[1]
                }
            })
        )
    })

    const colors = ["red", "blue", "green"]

    const dataChart = {
        datasets: newData.map((line, i) => ({
            label: "Linea " + (i + 1),
            data: line,
            backgroundColor: colors[i],
            borderColor: colors[i],
            borderWidth: 1,
            pointBackgroundColor: colors[i],
            pointBorderColor: colors[i], 
            pointRadius: 5,
            pointHoverRadius: 5,
            fill: false,
            tension: 0,
            showLine: true
        }))
    };

    const config = {
        type: 'scatter',
        data: dataChart,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        },
        showLine: true
    };

    const myChart = new Chart(
        document.getElementById('chart'),
        config
    );
}
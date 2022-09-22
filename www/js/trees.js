

function drawTree(data) {

    this.data = data;

    console.log(data);
    
    const myDiagram = new go.Diagram("myDiagramDiv",
        {
            "undoManager.isEnabled": true,
            layout: new go.TreeLayout({ angle: 0, layerSpacing: 50,nodeSpacing: 50, layerStyle: go.TreeLayout.LayerUniform })
        });

    myDiagram.nodeTemplate =
        new go.Node("Auto")
        .add(new go.Shape()
            .bind("figure", "fig")
            .bind("fill", "color"))
            .add(new go.TextBlock("Default Text", { margin: 10 })
                .bind("text", "key")
                .bind("text", "text"));


    myDiagram.linkTemplate =
        new go.Link(
            new go.Link({ routing: go.Link.Orthogonal})
                .add(new go.Shape())
                .add(new go.Shape({ toArrow: "Standard" }))
                .add(new go.TextBlock({ margin: 10, textAlign: "left"})
                    .bind("text", "text")));
        
    var nodeDataArray = [
        { text:"1", key: "1", color: "lightblue", fig: "RoundedRectangle" },
        { text: "2", key: "2", color: "lightblue", fig: "Ellipse" },

        // sin estudio
        { text: "5", key: "5", color: "lightblue", fig: "RoundedRectangle" },
        { text: "1", key: "10", color: "lightblue", fig: "Ellipse" },
        { text: "2", key: "11", color: "lightblue", fig: "Ellipse" },
        { text: "3", key: "12", color: "lightblue", fig: "Ellipse" },
        { text: "S1", key: "13", color: "white", fig: "Ellipse" },
        { text: "S2", key: "14", color: "white", fig: "Ellipse" },
        { text: "S1", key: "15", color: "white", fig: "Ellipse" },
        { text: "S2", key: "16", color: "white", fig: "Ellipse" },
        { text: "S1", key: "17", color: "white", fig: "Ellipse" },
        { text: "S2", key: "18", color: "white", fig: "Ellipse" },

        // con estudio desfavorable

        { text: "4", key: "4", color: "lightblue", fig: "RoundedRectangle" },
        { text: "9", key: "29", color: "lightblue", fig: "Ellipse" },
        { text: "10", key: "30", color: "lightblue", fig: "Ellipse" },
        { text: "11", key: "31", color: "lightblue", fig: "Ellipse" },

        { text: "S1", key: "32", color: "white", fig: "Ellipse" },
        { text: "S2", key: "33", color: "white", fig: "Ellipse" },
        { text: "S1", key: "34", color: "white", fig: "Ellipse" },
        { text: "S2", key: "35", color: "white", fig: "Ellipse" },
        { text: "S1", key: "36", color: "white", fig: "Ellipse" },
        { text: "S2", key: "37", color: "white", fig: "Ellipse" },

        // con estudio favorable 
        { text: "3", key: "3", color: "lightblue", fig: "RoundedRectangle" },
        { text: "6", key: "6", color: "lightblue", fig: "Ellipse" },
        { text: "7", key: "7", color: "lightblue", fig: "Ellipse" },
        { text: "8", key: "8", color: "lightblue", fig: "Ellipse" },

        { text: "S1", key: "19", color: "white", fig: "Ellipse" },
        { text: "S2", key: "20", color: "white", fig: "Ellipse" },
        { text: "S1", key: "21", color: "white", fig: "Ellipse" },
        { text: "S2", key: "22", color: "white", fig: "Ellipse" },
        { text: "S1", key: "23", color: "white", fig: "Ellipse" },
        { text: "S2", key: "24", color: "white", fig: "Ellipse" },




        // ev

        { text: `Ev : ${data.evidencia_favorable[0].toFixed(2)}`, key: "40", color: "white", fig: "Ellipse" },
        { text: `Ev : ${data.evidencia_favorable[1].toFixed(2)}`, key: "41", color: "white", fig: "Ellipse" },
        { text: `Ev : ${data.evidencia_favorable[2].toFixed(2)}`, key: "42", color: "white", fig: "Ellipse" },
        { text: `Ev : ${data.evidencia_desfavorable[0].toFixed(2)}`, key: "43", color: "white", fig: "Ellipse" },
        { text: `Ev : ${data.evidencia_desfavorable[1].toFixed(2)}`, key: "44", color: "white", fig: "Ellipse" },
        { text: `Ev : ${data.evidencia_desfavorable[2].toFixed(2)}`, key: "45", color: "white", fig: "Ellipse" },

    ];
var linkDataArray = [
    
        { from: "1", to: "2", text: "estudio" },
        { from: "1", to: "5", text: "Sin estudio" },
        { from: "5", to: "10", text: "d1" },
        { from: "5", to: "11", text: "d2" },
        { from: "5", to: "12", text: "d3" },
        { from: "10", to: "13", text: "" },
        { from: "10", to: "14", text: "" },
        { from: "11", to: "15", text: "" },
        { from: "11", to: "16", text: "" },
        { from: "12", to: "17", text: "" },
        { from: "12", to: "18", text: "" },

    // con estudio favorable
    { from: "2", to: "3", text: `Favorable \n${data.probabilidad_favorable.toFixed(2)}` },
    { from: "3", to: "6", text: "d1" },
    { from: "3", to: "7", text: "d2" },
    { from: "3", to: "8", text: "d3" },

    { from: "6", to: "19", text: `Ps1/f \n${data.probabilidad_ocurrencia[0].toFixed(2)}` },
    { from: "6", to: "20", text: `Ps1/u \n${data.probabilidad_ocurrencia[2].toFixed(2)}` },
    { from: "7", to: "21", text: `Ps1/f \n${data.probabilidad_ocurrencia[0].toFixed(2)}` },
    { from: "7", to: "22", text: `Ps1/u \n${data.probabilidad_ocurrencia[2].toFixed(2)}` },
    { from: "8", to: "23", text: `Ps1/f \n${data.probabilidad_ocurrencia[0].toFixed(2)}` },
    { from: "8", to: "24", text: `Ps1/u \n${data.probabilidad_ocurrencia[2].toFixed(2)}` },

    {from: "19", to: "40", text: ""},
    {from: "20", to: "40", text: ""},
    {from: "21", to: "41", text: ""},
    {from: "22", to: "41", text: ""},
    {from: "23", to: "42", text: ""},
    {from: "24", to: "42", text: ""},
    

        // con estudio desfavorable

    { from: "2", to: "4", text: `Desfavorable \n${data.probabilidad_desfavorable.toFixed(2)}` },
        { from: "4", to: "29", text: "d1" },
        { from: "4", to: "30", text: "d2" },
    { from: "4", to: "31", text: "d3" },
        
        { from: "29", to: "32", text: `Ps2/f \n${data.probabilidad_ocurrencia[1].toFixed(2)}` },
        { from: "29", to: "33", text: `Ps2/u \n${data.probabilidad_ocurrencia[3].toFixed(2)}` },
        { from: "30", to: "34", text: `Ps2/f \n${data.probabilidad_ocurrencia[1].toFixed(2)}` },
        { from: "30", to: "35", text: `Ps2/u \n${data.probabilidad_ocurrencia[3].toFixed(2)}` },
        { from: "31", to: "36", text: `Ps2/f \n${data.probabilidad_ocurrencia[1].toFixed(2)}` },
        { from: "31", to: "37", text: `Ps2/u \n${data.probabilidad_ocurrencia[3].toFixed(2)}` },
        
    { from: "32", to: "43", text: "" },
    { from: "33", to: "43", text: "" },
    { from: "34", to: "44", text: "" },
    { from: "35", to: "44", text: "" },
    { from: "36", to: "45", text: "" },
    { from: "37", to: "45", text: "" },

    ];

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

}

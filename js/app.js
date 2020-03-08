// Load up the data
// runing python http.server to get around CORS

function createScatterViz() {
    d3.csv("data/data.csv").then(function(stateData) {
        scatterViz(stateData);
        console.log(stateData);})



function scatterViz(stateData) {
    d3.select("svg")    
        .append("g")
        .attr("state", "statesG")
        .attr("transform", "translate(50, 150)")
        .selectAll("g")
        .data(stateData)
        .enter()
        .append("g")
        .attr("class", "overallG")
        .attr("transform", (d, i ) => "translate(" + (i * 50) + ", 10)")
    var statesG = d3.selectAll("g.overallG");
    statesG
        .append("circle")
        .attr("r", 20)
    statesG
        .append("text")
        .attr("y", 30)
        .text(d => d.state)

    const dataKeys = Object.keys(stateData[0])
        .filter(d => d !== "id" && d !== "abbr" && d !== "state")
     d3.select("#controls").selectAll("button.teams")
        .data(dataKeys).enter()
        .append("button")
        .on("click", buttonClick)
        .html(d => d);
    function buttonClick(datapoint) {
        var maxValue = d3.max(stateData, d => parseFloat(d[datapoint]))
        var radiusScale = d3.scaleLinear()
        .domain([ 0, maxValue ]).range([ 2, 20 ])
        d3.selectAll("g.overallG").select("circle")
        .attr("r", d => radiusScale(d[datapoint]))
        }
    }
}

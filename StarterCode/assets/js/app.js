// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;
var margin = {
   top: 20,
   right: 40,
   bottom: 60,
   left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight);
var chartGroup = svg.append("g")
   .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Import Data
// Step 1: Parse Data/Cast as numbers
// ====
d3.csv("assets/data/data.csv").then(function(csvData) {
    console.log(csvData);
    csvData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        console.log("parseData", data);
    });
       // Step 2: Create scale functions for x and y
       // ==============================
       var xLinearScale = d3.scaleLinear()
           .domain([7, d3.max(csvData, d => d.poverty)])
           .range([0, width]);
       var yLinearScale = d3.scaleLinear()
           .domain([0, d3.max(csvData, d => d.healthcare)])
           .range([height, 0]);
       // Step 3: Create axis functions
       // ==============================
       var bottomAxis = d3.axisBottom(xLinearScale);
       var leftAxis = d3.axisLeft(yLinearScale);
       // Step 4: Append Axes to the chart
       // ==============================
       chartGroup.append("g")
           .call(leftAxis);
       chartGroup.append("g")
           .attr("transform", `translate(0, ${height})`)
           .call(bottomAxis);
       // Step 5: Create Circles
       // ==============================
       var circlesGroup = chartGroup.selectAll("circle")
           .data(csvData)
           .enter()
           .append("circle")
           .attr("cx", d => xLinearScale(d.poverty))
           .attr("cy", d => yLinearScale(d.healthcare))
           .attr("r", "10")
           .attr("fill", "green")
   
///////////////
//create circles
    var circlesGroup = chartGroup.selectAll()
    .data(csvData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));
// // Step 6: Initialize tool tip
// // ==============================
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>healthcare: ${d.healthcare}` );
    });
    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);
    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
    })
   // onmouseout event
   .on("mouseout", function (data) {
       toolTip.hide(data);
   });
// Create axes labels
    chartGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - margin.left + 40)
   .attr("x", 0 - (height / 2))
   .attr("dy", "1em")
   .attr("class", "axisText")
   .text("Lack of Healthcare");
    chartGroup.append("text")
   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
   .attr("class", "axisText")
   .text("In Poverty (%)");
});





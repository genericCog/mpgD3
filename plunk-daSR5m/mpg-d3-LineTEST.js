// set the dimensions of the canvas
var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40
  },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//Parse the date & time. JSON file Date format: 10/4/2013
var parseDate = d3.time.format("%x").parse;

//Set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var y = d3.scale.linear().range([height, 0]);

// OLD set the ranges
//var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
//var y = d3.scale.linear().range([height, 0]);

// Define the axis
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%x"));

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left").ticks(5);

//define the line
var valueline = d3.svg.line()
  .x(function(d) {
    return x(d.Date);
  })
  .y(function(d) {
    return y(d.MPG);
  });

//Add the SVG canvas element
var svg = d3.select("#myVertBarChart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


// Load the data
d3.json("mpg2.json", function(error, data) {
  data.forEach(function(d) {
    d.Date = parseDate(d.Date);
    d.MPG = +d.MPG;
  });
  // OLD scale the range of the data
  //x.domain(data.map(function(d) { return d.Date; }));
  //y.domain([0, d3.max(data, function(d) { return d.MPG; })]);

  //Scale the range of the data
  x.domain(d3.extent(data, function(d) {
    return d.Date;
  }));
  y.domain([0, d3.max(data, function(d) {
    return d.MPG;
  })]);

  // Add the valueLine path
  svg.append("g")
    .attr("class", "line")
    .attr("d", valueline(data));


  // Add the X axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-65)");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 5)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("MPG");


  // Add bar chart
  svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.Date);
    })
    .attr("width", x.rangeBand())
    .attr("y", function(d) {
      return y(d.MPG);
    })
    .attr("height", function(d) {
      return height - y(d.MPG);
    });

});
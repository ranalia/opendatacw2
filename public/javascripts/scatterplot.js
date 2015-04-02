var margin = {top: 50, right: 20, bottom: 50, left: 200},
    width = 1024 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d/%m/%Y").parse;

var diffDays = function(d) { 
  var timeDiff = Math.abs(d["Completion Date (B1)"] - d["Start Date"]); //time length of project
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))+1; 
              return diffDays;}

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue = diffDays, // data -> value
    xScale = d3.scale.linear().range([0, 700]), // value -> display (width of value)
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return (d["Planned Cost ($ M)"]*1000)/ diffDays(d);}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display (end point, start point)
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d["Agency Name"];},
    color = d3.scale.category20();

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip panel")
    .style("opacity", 0);


// load data
d3.csv("/data/projects.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d["Start Date"] =  parseDate(d["Start Date"]);
    d["Completion Date (B1)"] =  parseDate(d["Completion Date (B1)"]);
    d["Planned Cost ($ M)"] = +d["Planned Cost ($ M)"];
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1000, d3.max(data, xValue)+1000]);
  yScale.domain([d3.min(data, yValue)-250, d3.max(data, yValue)+250]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", 800)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Time Cost (Days)");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      //.text("Planned Cost");
      .text("Planned Cost/time ($1000/day)");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d){return (Math.sqrt(d["Planned Cost ($ M)"])*0.4+2);})
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 0.9);
          tooltip.html("<div class='panel-body'><b>"+d["Project Name"] + "</b><br/>"
            +d["Planned Cost ($ M)"]+" ($M), "+ Math.ceil(xValue(d)/365*12)+" (months)<br/>"+Math.ceil(yValue(d))+" (k$/day)</div>" )
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
          d3.select(this).transition()
              .duration(100)
              .attr("stroke","black")
              .attr("stroke-width","3px");

      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
          d3.select(this).transition()
              .duration(100)
              .attr("stroke","none");
      });

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { 
        var p; 
        if (i<13){p="translate(-300," + i * 20 + ")"}else{p="translate(0," + (i * 20-260) + ")"}
        return p; })//position of legend
      .on("mouseover",function(d){
        d3.select(this).select("text").attr("font-weight","bold");
        d3.select(this).select("rect").attr("stroke","black").attr("stroke-width","1px");
      })
      .on("mouseout",function(d){
        d3.select(this).select("text").attr("font-weight","normal");
        d3.select(this).select("rect").attr("stroke","none");
      })
      .on("click",function(d){
        var agency=d3.select(this).text();
        d3.selectAll(".dot").data(data).filter(function(d){
          return d["Agency Name"]!=agency;
        })
        .style("visibility","hidden");
        d3.selectAll(".dot").data(data).filter(function(d){
          return d["Agency Name"]==agency;
        })
        .style("visibility","visible");
      });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})


  d3.select("#alldots").on("click", function(d)
  {
    d3.selectAll(".dot").style("visibility","visible");
  });

    d3.select("#scale1").on("click", function(d)
  {
    yMap = function(d) { return yScale(yValue(d)*10);}
    d3.select("g").select(".y.axis").transition().duration(500).attr("opacity",0);
    d3.selectAll(".dot").transition().duration(1000).attr("cy",yMap);
    
  });
    d3.select("#scale2").on("click", function(d)
  {
    yMap = function(d) { return yScale(yValue(d));}
    d3.select(".y.axis").transition().duration(500).attr("opacity",1);
    d3.selectAll(".dot").transition().duration(1000).attr("cy",yMap);
    
  });

});

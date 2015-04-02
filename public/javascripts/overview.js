     var margin = { top: 20, right: 0, bottom: 0, left: 300 },
          width = 1024 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom,
          gridSize = Math.floor(height / 26-2),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          days = ["Department of Agriculture","Department of Commerce","Department of Defense","Department of Education","Department of Energy",
          "Department of Health and Human Services","Department of Homeland Security",
          "Department of Housing and Urban Development","Department of Justice","Department of Labor",
          "Department of State","Department of the Interior","Department of the Treasury","Department of Transportation",
          "Department of Veterans Affairs","Environmental Protection Agency","General Services Administration",
          "National Aeronautics and Space Administration","National Archives and Records Administration",
          "National Science Foundation","Nuclear Regulatory Commission","Office of Personnel Management",
          "Small Business Administration","Social Security Administration","U.S. Agency for International Development",
          "U.S. Army Corps of Engineers"],
          times = ["1992","1996","1997","1998","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","total"];

function heatmap1(){
      d3.csv("/data/heatcount.csv",
        function(d) {
          return{
            y: +d.y,
            x: +d.x,
            value: +d.pcount
          };
        },
        function(error, data) {
          d3.selectAll(".heatmap").remove();
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var svg = d3.select("#chart").append("svg")
              .attr("class","heatmap")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var dayLabels = svg.selectAll(".dayLabel")
              .data(days)
              .enter().append("text")
                .text(function (d) { return d; })
                .attr("x", 0)
                .attr("y", function (d, i) { return i * gridSize; })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
               /* .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); })*/;

          var timeLabels = svg.selectAll(".timeLabel")
              .data(times)
              .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridSize*1.7+8; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", function(d, i) { return ((i >= 12 && i <= 19) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

          var heatMap = svg.selectAll(".hour")
              .data(data)
              .enter().append("rect")
              .attr("x", function(d) { return (d.x - 1) * gridSize*1.7; })
              .attr("y", function(d) { return (d.y - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize*1.7)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          heatMap.transition().duration(1000)
              .style("fill", function(d) { if(d.value==1){return "#edf8b1"}else{return colorScale(d.value)}; });

          heatMap.append("title").text(function(d) { return d.value; });
              
          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height-30)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { if(Math.round(d)==2){return "≥ 1"}else{return "≥ " + Math.round(d);}; })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize - 30);
      });};
     function heatmap2(){
      d3.csv("/data/heatcount.csv",
        function(d) {
          return{
            y: +d.y,
            x: +d.x,
            value: +d.actualcost
          };
        },
        function(error, data) {
          d3.selectAll(".heatmap").remove();
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var svg = d3.select("#chart").append("svg")
              .attr("class","heatmap")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var dayLabels = svg.selectAll(".dayLabel")
              .data(days)
              .enter().append("text")
                .text(function (d) { return d; })
                .attr("x", 0)
                .attr("y", function (d, i) { return i * gridSize; })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
               /* .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); })*/;

          var timeLabels = svg.selectAll(".timeLabel")
              .data(times)
              .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridSize*1.7+8; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", function(d, i) { return ((i >= 12 && i <= 19) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

          var heatMap = svg.selectAll(".hour")
              .data(data)
              .enter().append("rect")
              .attr("x", function(d) { return (d.x - 1) * gridSize*1.7; })
              .attr("y", function(d) { return (d.y - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize*1.7)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          heatMap.transition().duration(1000)
              .style("fill", function(d) { if(d.value==1){return "#edf8b1"}else{return colorScale(d.value)}; });

          heatMap.append("title").text(function(d) { return d.value; });
              
          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height-30)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { if(Math.round(d)==2){return "≥ 1"}else{return "≥ " + Math.round(d);}; })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize -30 );
      });};

     heatmap1();
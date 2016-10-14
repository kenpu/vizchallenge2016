var width = 400, height = 400;

var projection = d3.geo.orthographic()
    .scale(180)
    .clipAngle(90)
    .translate([width / 2, height / 2 ]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("#main").append("svg").attr("width", width).attr("height", height);

// painting the world
svg.selectAll("path")
  .data(world.features)
  .enter()
  .append("path")
  .attr('d', path)
  .attr('fill-opacity', 0.5)
  .attr('fill', '#78a');



function rotate() {
    var r = projection.rotate();
    r[2] += 5;
    projection.rotate(r);
}

function refresh() {
    svg.selectAll("path").attr("d", path);
}

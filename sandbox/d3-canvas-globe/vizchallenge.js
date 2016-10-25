var width = 1000, height = 1000;

var projection = d3.geo.orthographic()
    .scale(1000)
    .rotate([0, 0, 0])
    .clipAngle(45)
    .translate([width / 2, height / 2 ]);

var canvas = d3.select("#main").attr("width", width).attr("height", height);
var ctx = canvas.node().getContext('2d');

var path = d3.geo.path().projection(projection).context(ctx);

var globe = {type: 'Sphere'};

canvas.on("mousedown.drag", onMapClick);

// http://stackoverflow.com/questions/15907171/d3-canvas-globe-mouse-events
function onMapClick() {
  console.log("clicked")
  rotateMap(projection.invert(d3.mouse(this)));
}

canvas.call(d3.behavior.zoom()
    .scaleExtent([1 / 2, 4])
    .on("zoom", zoomed));

function zoomed() {
  ctx.save();
  console.log(d3.event)
  ctx.clearRect(0, 0, width, height);
  ctx.translate(d3.event.translate[0], d3.event.translate[1]);
  ctx.scale(d3.event.scale, d3.event.scale);
  refresh()
  ctx.restore();
}

function rotateMap(p) {
  d3.transition()
    .duration(850)
    .tween("rotate", function() {
        var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);

        return function(t) {
          projection.rotate(r(t));
          refresh();
        };
      })
    .transition();
}

function rotate() {
    var r = projection.rotate();
    r[0] += 5;
    projection.rotate(r);
}

function drawFeature(feature, fill) {
    fill = fill || "black";
    ctx.save();
    ctx.fillStyle = fill;
    ctx.beginPath();
    path(feature);
    ctx.fill();
    ctx.restore();
}

function drawPoint(point) {
    var feature = {
        type: "Point",
        coordinates: [point.lat, point.lon]
    };
    ctx.beginPath();
    path.pointRadius(point.size)(feature);
    ctx.fill();
}

function drawPoints(points, fill) {
    ctx.save();
    ctx.fillStyle = fill;
    points.forEach(drawPoint);
    ctx.restore();
}

function refresh() {
    ctx.clearRect(0, 0, width, height);

    drawFeature(globe, "#78a");

    world.features.forEach(function(x) {
        drawFeature(x, "#579");
    });

    drawPoints(data);
}

var epoch = 0;
function start() {
    rotate();
    refresh();
    epoch += 1;
    if(epoch < 100) setTimeout(start, 200);
}

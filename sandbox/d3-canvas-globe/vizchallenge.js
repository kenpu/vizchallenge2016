var width = 600, height = 600;

var projection = d3.geo.orthographic()
    .scale(300)
    .rotate([0, 0, 0])
    .clipAngle(45)
    .translate([width / 2, height / 2 ]);

var canvas = d3.select("#main").attr("width", width).attr("height", height);
var ctx = canvas.node().getContext('2d');

var path = d3.geo.path().projection(projection).context(ctx);

var globe = {type: 'Sphere'};

refresh();

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

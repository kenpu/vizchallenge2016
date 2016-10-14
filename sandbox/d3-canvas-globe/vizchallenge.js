var width = 400, height = 400;

var projection = d3.geo.orthographic()
    .scale(180)
    .clipAngle(90)
    .translate([width / 2, height / 2 ]);

var canvas = d3.select("#main").attr("width", width).attr("height", height);
var ctx = canvas.node().getContext('2d');

var path = d3.geo.path().projection(projection).context(ctx);

var globe = {type: 'Sphere'};

refresh();

function rotate() {
    var r = projection.rotate();
    r[2] += 5;
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

function refresh() {
    ctx.clearRect(0, 0, width, height);

    drawFeature(globe, "#78a");

    world.features.forEach(drawFeature);
}

var data = [];
var N = 1000;

for(var i=0; i < N; i++) {
    data.push({
        lat: random(-18, 18),
        lon: random(-9, 9),
        size: random(1, 4),
    });
}

function random(a, b) {
    return Math.round((b-a)*Math.random() + a);
}

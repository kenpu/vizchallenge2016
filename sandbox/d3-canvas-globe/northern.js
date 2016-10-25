var data = [];
// var N = 1000;

// for(var i=0; i < N; i++) {
//     data.push({
//         lat: random(-18, 18),
//         lon: random(-9, 9),
//         size: random(1, 4),
//     });
// }

// function random(a, b) {
//     return Math.round((b-a)*Math.random() + a);
// }

console.log(northern.grid);
northern.grid.forEach(function(point){
	if(!point[2]) {
		console.log("nope")
		var size = 1;
	} else {
		var size = point[2]*3;
		//console.log(size);
	}
	data.push({
		lat: point[1],
		lon: point[0],
		size: size
	})
});
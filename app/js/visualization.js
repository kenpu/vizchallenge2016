// viz
import Detector from './vendor/Detector.js'
import TWEEN from './vendor/Tween.js'
import DAT from './vendor/globe.js'

let viz = {}

viz.generate = () => {

    if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {
      var years = ['1990','1995','2000'];
      var container = document.getElementById('globe');
      var globe = new DAT.Globe(container);
      console.log(globe);
      var i, tweens = [];
      
      var settime = function(globe, t) {
        return function() {
          new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
          var y = document.getElementById('year'+years[t]);
          if (y.getAttribute('class') === 'year active') {
            return;
          }
          var yy = document.getElementsByClassName('year');
          for(i=0; i<yy.length; i++) {
            yy[i].setAttribute('class','year');
          }
          y.setAttribute('class', 'year active');
        };
      };
      
      for(var i = 0; i<years.length; i++) {
        var y = document.getElementById('year'+years[i]);
        y.addEventListener('mouseover', settime(globe,i), false);
      }

      TWEEN.start();
    }
}
viz.sayhi = () => {
	console.log("hello")
}

export default viz
<template>
  <div class="container">
    <div class="map">
    map goes here
    </div>
  <div id="currentInfo">
    <span id="year1990" class="year">1990</span>
    <span id="year1995" class="year">1995</span>
    <span id="year2000" class="year">2000</span>
  </div>
    <div id="globe"></div>
  </div>
</template>

<script>
import viz from '../js/visualization.js'
export default {
  data() {
    return {
      
    }
  },
  ready() {
  	console.log("ready now...")
  	viz.generate()
  }
}
</script>
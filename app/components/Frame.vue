<template>
  <div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {

      }
    },
    created: function () {
      console.log("app started")
    }
  }
</script>


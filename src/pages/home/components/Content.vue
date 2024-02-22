<template class="__body">
  <t-card bordered :style="{width: screenWidth ,height:screenHeight, margin:'3px auto 3px auto', overflow:'scroll'}">
    <div id="app"><router-view/></div>
  </t-card>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      screenWidth: document.documentElement.clientWidth - 260 + 'px', // 屏幕宽度
      screenHeight: document.documentElement.clientHeight - 65 + 'px' // 屏幕高度
    }
  }
}

</script>

<style scoped>
.__body{
}
</style>

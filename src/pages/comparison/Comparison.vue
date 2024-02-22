<template>
  <div class="__main">
    <div class="__text" :style="{height:screenHeight}">
      <textarea class="__text_left" @input="leftInput()" placeholder="请输入内容" v-model="leftData"/>
      <textarea class="__text_right" @input="rightInput()" placeholder="请输入内容" v-model="rightData"/>
    </div>
    <div class="__code-diff">
      <code-diff
          :old-string="oldStr"
          :new-string="newStr"
          output-format="side-by-side"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Comparison",
  data() {
    return {
      leftData: '',
      rightData: '',
      oldStr: '',
      newStr: '',
      screenHeight: document.documentElement.clientHeight - 435 + 'px' // 屏幕高度
    }
  },
  methods: {
    leftInput() {
      this.$data.oldStr = this.$data.leftData;
    },
    rightInput() {
      this.$data.newStr = this.$data.rightData;
    }
  },
}
</script>

<style>
.__main {
  overflow: scroll;
}

.__text {
  width: 100%;
}

.__text_left {
  width: 49%;
  height: 100%;
  float: left;
  resize: none;
  outline: none;
  border: 1px solid #efefef;
}

.__text_right {
  width: 49%;
  height: 100%;
  float: right;
  resize: none;
  outline: none;
  border: 1px solid #efefef;
}

.__code-diff-view {
  width: 100%;
  margin-top: 10px;
}
</style>

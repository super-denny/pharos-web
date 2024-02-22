<template>
  <div class="__main">
    <div class="__left">
      <textarea class="__left_json" @input="leftInput()" :style="{height:screenHeight+ 'px'}" placeholder="请输入内容"
                v-model="myData"/>
    </div>
    <div class="__right">
      <vue-json-pretty class="__right_json" :style="{height:screenHeight + 4 + 'px'}" :data=jsonData v-show=showStatus />
        <div v-show=!showStatus class="__right_json_replace" :style="{height:screenHeight + 4 + 'px'}"></div>
    </div>
  </div>

</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: "FormatJson",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      myData: null,
      jsonData: {},
      showStatus: false,
      screenHeight: document.documentElement.clientHeight - 135, // 屏幕高度
    };
  },
  methods: {
    leftInput() {
      this.$data.jsonData = JSON.parse(this.$data.myData);
      this.$data.showStatus = true;
    },
  }
}
</script>

<style scoped>
.__main {
  width: 100%;
}

.__left {
  width: 50%;
  float: left;
}

.__left_json {
  width: 96%;
  margin: 5px 2% auto 2%;
  border: 1px solid #efefef;
  resize: none;
  outline: none;
}

.__right {
  width: 49%;
  float: right;
}

.__right_json {
  width: 96%;
  margin: 5px 2% auto 2%;
  border: 1px solid #efefef;
  overflow: scroll;
}

.__right_json_replace {
  width: 96%;
  margin: 5px 2% auto 2%;
  border: 1px solid #efefef;
  overflow: scroll;
}

</style>

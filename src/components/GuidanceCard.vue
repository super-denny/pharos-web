<template>
  <div class="my-card">
    <div class="my-card-left">
      <t-image :src=icon fit="cover" :style="{ width: '80px', height: '80px' }"/>
    </div>
    <div class="my-card-right">
      <div style="font-size: 15px;">
        <b>{{ title }}</b>
      </div>
      <div style="margin-top: 10px;">
        {{ url }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "GuidanceCard",
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
  }
};
</script>

<style>
.my-card {
  width: 250px;
  height: 80px;
  padding: 10px;
  border: 1px solid #efefef;
  box-shadow: 5px 5px 5px lightgray;
  cursor: pointer;
}

.my-card:hover {
  box-shadow: 5px 5px 5px deepskyblue;
}

.my-card-left {
  width: 40%;
  height: 100%;
  float: left;
}

.my-card-right {
  width: 60%;
  height: 100%;
  float: right;
  overflow: hidden;
}
</style>


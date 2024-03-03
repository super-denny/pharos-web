<template>
  <t-dialog header="链接提报"
            :visible="value"
            :onClose="popClose"
            :onConfirm="popClose"
            :confirmBtn="null"
            :cancelBtn="null"
            :onOpened="getAllType"
  >
    <div slot="body">
      <div>
        <t-form ref="form" :data="formData" :rules="rules" colon @reset="onReset" @submit="onSubmit">
          <t-form-item label="标题" name="title">
            <t-input v-model="formData.title" placeholder="请输入标题"></t-input>
          </t-form-item>
          <t-form-item label="链接" name="url">
            <t-input v-model="formData.url" placeholder="请输入链接地址"></t-input>
          </t-form-item>
          <t-form-item label="图标" name="icon">
            <t-upload
                action="上传地址"
                theme="image"
                tips="请选择单张图片文件上传"
                accept="image/*"
                :formatResponse="formatImgResponse"
                name="fileUpload"
            >
            </t-upload>
          </t-form-item>
          <t-form-item label="是否私有" name="privacy">
            <t-radio-group v-model="formData.privacy">
              <t-radio value='1'>是</t-radio>
              <t-radio value='0'>否</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item v-if="formData.privacy === '0'" label="分类" name="type">
            <t-select v-model="formData.type">
              <t-option v-for="item in typeList" :key=item.id :label=item.title :value=item.id></t-option>
            </t-select>
          </t-form-item>
          <t-form-item style="margin-left: 100px">
            <t-space size="10px">
              <t-button theme="primary" type="submit">提交</t-button>
              <t-button theme="default" variant="base" type="reset">重置</t-button>
            </t-space>
          </t-form-item>
        </t-form>
      </div>
    </div>
  </t-dialog>
</template>

<script>
import {post, get} from "@/common/http";
import {guidanceTypeList, submitLink} from "@/common/api";

const INITIAL_DATA = {
  title: '',
  url: '',
  icon: '',
  privacy: 0,
  type: ''
}
export default {
  name: "LinkSubmit",
  props: {
    formData: {
      type: Object,
      default: function () {
        return {...INITIAL_DATA}
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      typeList: [{}],
      rules: {
        title: [
          {
            required: true,
            message: '请填写标题',
            type: 'error',
            trigger: 'blur',
          }
        ],
        url: [
          {
            required: true,
            message: '请填写URL',
            type: 'error',
            trigger: 'blur',
          }
        ],
        icon: [
          {
            required: true,
            message: '请上传图标',
            type: 'error',
            trigger: 'blur',
          }
        ],
        type: [
          {
            required: true,
            message: '请选择分类',
            type: 'error',
            trigger: 'blur',
          }
        ],
        privacy: [
          {
            required: true,
            message: '请选择是否私有',
            type: 'error',
            trigger: 'blur',
          }
        ]
      },
    }
  },
  methods: {
    popClose() {
      this.$emit('input', false);
    },

    onSubmit({validateResult, firstError}) {
      if (validateResult === true) {
        const jsons = {
          title: this.formData.title,
          url: this.formData.url,
          icon: this.formData.icon,
          privacy: Number(this.formData.privacy),
          type: this.formData.type
        }
        post(submitLink, jsons).then(res => {
          if (res.data.code === 10000) {
            this.$message.success("提报成功，等待审核");
            this.$emit('input', false);
            this.formData = {...INITIAL_DATA}
          } else {
            this.$message.error(res.data.msg);
          }
        })
      } else {
        //console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },
    onReset() {
      this.$message.success('重置成功');
    },
    getAllType() {
      get(guidanceTypeList).then(res => {
        if (res.data.code === 10000) {
          //console.log(res.data);
          this.$data.typeList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    formatImgResponse(response) {
      try {
        if (response.responseCode !== 0) {
          return {error: response.message};
        }
        let urlStr = "https://cdn.webuy.ai/" + response.entry[0];
        this.formData.icon = urlStr;
        return {url: urlStr};
      } catch (e) {
        this.$message.error("上传失败，请稍后再试");
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>

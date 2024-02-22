<template>
  <div class="__main">
    <t-layout>
      <t-header :isFixed="true">
        <t-head-menu class="__head_menu" :theme=theme :value="current" height="120px">
          <img
              slot="logo"
              width="136"
              class="logo"
              src="../../../assets/logo.png"
              alt="logo"
          />
          <t-menu-item value="guidance" @click="guidance(false)"><b>导航</b></t-menu-item>
          <t-menu-item value="comparison" @click="comparison()"><b>文本对比</b></t-menu-item>
          <t-menu-item value="formatJson" @click="formatJson()"><b>JSON格式化</b></t-menu-item>
          <template #operations>
            <marquee behavior=scroll scrollamount="5" width="300"
                     style="color: #f57e08; margin-right: 10px;" loop="1">
              {{ notice }}
            </marquee>
            <icon class="t-menu__operations-icon" :name=themeLogo @click="changeTheme()"/>
          </template>
        </t-head-menu>
      </t-header>
      <t-content>
        <Content/>
      </t-content>
      <t-space class="__right-space">
        <t-sticky-tool :style="{ position: 'relative'}" :offset="[-spaceW, spaceH]">
          <t-sticky-item
              trigger="hover"
              label="收藏夹"
              :icon="renderCartIcon"
              :popup="renderPopup"
              :popup-props="{ overlayInnerStyle: { padding: '4px', height: '28px' } }"
              @dblclick.native="clickBookMark"
          />
          <t-sticky-item
              trigger="hover"
              label="个人中心"
              :icon="userIcon"
              @click.native="personCenter"
          />
          <t-sticky-item
              trigger="hover"
              label="链接提报"
              :icon="linkIcon"
              @click.native="submitLink"
          />
        </t-sticky-tool>
      </t-space>
      <LinkSubmit v-model="popVisible"/>
      <t-dialog header="登录"
                :visible="loginPopState"
                :confirmBtn="null"
                :cancelBtn="null"
                :onClose="closeLoginPop"
      >
        <div slot="body">
          <t-form :data="loginFormData" ref="form" :rules="loginRules" @reset="onReset" @submit="login"
                  :colon="true" :labelWidth="0">
            <t-form-item name="account">
              <t-input clearable v-model="loginFormData.account" placeholder="请输入账号">
                <desktop-icon></desktop-icon>
              </t-input>
            </t-form-item>
            <t-form-item name="password">
              <t-input type="password" clearable v-model="loginFormData.password"
                       placeholder="请输入密码">
                <lock-on-icon></lock-on-icon>
              </t-input>
            </t-form-item>
            <t-form-item>
              <t-button theme="primary" type="submit" block>登录</t-button>
            </t-form-item>
          </t-form>
        </div>
      </t-dialog>
    </t-layout>
  </div>
</template>

<script>
import {Icon, Animation1Icon, UserIcon, LinkIcon} from 'tdesign-icons-vue';
import Content from "@/pages/home/components/Content";
import {login, queryMyCollection, submitLink} from "@/common/api";
import {get, post} from "@/common/http";
import LinkSubmit from "@/pages/home/components/LinkSubmit.vue";

const INITIAL_DATA = {
  title: '',
  url: '',
  privacy: '0'
}
export default {
  components: {
    Icon,
    Content,
    LinkSubmit
  },

  data() {
    return {
      current: '',
      theme: 'light',
      themeLogo: 'logo-apple-filled',
      spaceW: document.documentElement.clientWidth - 20,
      spaceH: document.documentElement.clientHeight - document.documentElement.clientHeight / 1.3,
      notice: "",
      popVisible: false,
      formData: {...INITIAL_DATA},
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
        privacy: [
          {
            required: true,
            message: '请选择是否私有',
            type: 'error',
            trigger: 'blur',
          }
        ]
      },
      loginPopState: false,
      loginFormData: {},
      loginRules: {
        username: [
          {
            required: true,
            message: '请填写用户名',
            type: 'error',
            trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            message: '请填写密码',
            type: 'error',
            trigger: 'blur',
          }
        ]
      },
    }
  },
  methods: {
    guidance(needReport) {
      this.$data.current = 'guidance';
      this.$router.push({name: 'guidance', params: {needReport: needReport}})
    },
    comparison() {
      this.$data.current = 'comparison';
      this.$router.push({path: '/comparison/comparison'})
    },
    formatJson() {
      this.$data.current = 'formatJson';
      this.$router.push({path: '/format/format'})
    },
    changeTheme() {
      if (this.$data.theme === 'dark') {
        this.$data.theme = 'light';
        this.$data.themeLogo = 'logo-apple-filled';
      } else {
        this.$data.theme = 'dark';
        this.$data.themeLogo = 'logo-apple';
      }
    },
    renderCartIcon() {
      return <Animation1Icon />;
    },
    userIcon() {
      return <UserIcon/>
    },
    linkIcon() {
      return <LinkIcon/>
    },
    async clickBookMark() {
      let bookMarkArray = [];
      await get(queryMyCollection).then(res => {
        if (res.data.code === 10000) {
          bookMarkArray = res.data.data;
          if (bookMarkArray === null || bookMarkArray.length === 0) {
            this.$notify.error({
              title: '提示',
              content: '书签暂无内容！',
              duration: 2000,
            });
            return;
          }
          bookMarkArray.forEach((item) => {
            window.open(item.url, item.title);
          })
        } else {
          this.$message.error(res.data.msg);
        }
      })

    },
    personCenter() {
      let userInfo = localStorage.getItem('loginUserInfo');
      if (userInfo === null) {
        this.loginPopState = true;
      } else {
        this.$router.push({path: '/person/personCenter'})
        this.$data.current = '';
      }
    },
    submitLink() {
      let userInfo = localStorage.getItem('loginUserInfo');
      if (userInfo === null) {
        this.loginPopState = true;
        return;
      }
      this.popVisible = true;
    },
    renderPopup() {
      return "双击打开书签集合";
    },
    onReset() {
      this.$message.success('重置成功');
    },
    onSubmit({validateResult, firstError}) {
      if (validateResult === true) {
        const jsons = {
          title: this.formData.title,
          url: this.formData.url,
          privacy: Number(this.formData.privacy)
        }
        post(submitLink, jsons).then(res => {
          //console.log(res)
          if (res.data.code === 10000) {
            this.$message.success("提报成功，等待审核");
            this.popVisible = false;
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
    login({validateResult, firstError}) {
      if (validateResult === true) {
        const jsons = {
          account: this.loginFormData.account,
          password: this.loginFormData.password
        }
        post(login, jsons).then(res => {
          if (res.data.code === 10000) {
            //存储信息
            this.$message.success("登录成功");
            localStorage.setItem('loginUserInfo', JSON.stringify(res.data.data));
            localStorage.setItem('loginToken', res.data.data.token);
            this.loginPopState = false;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      } else {
        //console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },
    closeLoginPop() {
      this.$data.loginPopState = false
    }
  },
  mounted() {
    this.guidance(true);
  }
};
</script>

<style>
.__main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.__head_menu {

}

.logo {
  margin-left: 10px;
}

.__right-space {
  height: 0;
}
</style>

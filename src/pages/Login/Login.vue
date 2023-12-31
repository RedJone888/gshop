<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: isPhoneLogWay }"
            @click="isPhoneLogWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !isPhoneLogWay }"
            @click="isPhoneLogWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: isPhoneLogWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!right_phone"
                class="get_verification"
                :class="{ right_phone }"
                @click.prevent="getCode"
              >
                {{
                  computeTime
                    ? `验证码已发送，还剩${computeTime}秒`
                    : "获取验证码"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !isPhoneLogWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  v-if="showPwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  v-else
                />
                <div
                  class="switch_button"
                  :class="showPwd ? 'on' : 'off'"
                  @click="showPwd = !showPwd"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{ showPwd ? "abc" : "..." }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click="getCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-arrow-left-bold"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "../../api";
export default {
  name: "Login",
  data() {
    return {
      isPhoneLogWay: true,
      phone: "",
      code: "",
      computeTime: 0,
      name: "",
      pwd: "",
      captcha: "",
      showPwd: false,
      alertShow: false,
      alertText: "",
    };
  },
  components: { AlertTip },
  computed: {
    right_phone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },
  methods: {
    async getCode() {
      if (!this.timer) {
        this.computeTime = 30;
        this.timer = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
        const result = await reqSendCode(this.phone);
        if (result.code === 1) {
          this.showAlert(result.msg);
          this.computeTime = 0;
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    },
    showAlert(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
    },
    async login() {
      let result;
      if (this.isPhoneLogWay) {
        const { right_phone, phone, code } = this;
        if (!right_phone) {
          this.showAlert("手机号不正确");
          return;
        } else if (!/^\d{4}$/.test(code)) {
          this.showAlert("验证码必须是4位数字");
          return;
        }
        result = await reqSmsLogin(phone, code);
      } else {
        const { name, pwd, captcha } = this;
        if (!name) {
          this.showAlert("用户名必须指定");
          return;
        } else if (!pwd) {
          this.showAlert("密码必须指定");
          return;
        } else if (!captcha) {
          this.showAlert("验证码必须指定");
          return;
        }
        result = await reqPwdLogin({ name, pwd, captcha });
      }
      if (result.code === 0) {
        this.$store.dispatch('recordUser',result.data)
        this.$router.replace("/profile");
      } else {
        if (this.isPhoneLogWay) {
          this.computeTime = 0;
          clearInterval(this.timer)
          this.timer=null
        } else {
          this.getCaptcha();
        }
        this.showAlert(result.msg)
      }
    },
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    getCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?date=" + Date.now();
    },
  },
};
</script>

<style lang="stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color #000
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(26px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
<template>
    <div class="login" :style="winSize">
        <el-row>
            <el-col :span='24'>
                <div class="content">
                    <el-form label-position="left" label-width="0px" class="demo-ruleForm card-box loginform"
                             v-loading="loginActions.disabled"
                             :element-loading-text="'正在'+(false===true ? '' : '登录')+'...'"
                             :style="formOffset"
                             :model='data'
                             :rules="dataValidate"
                             ref='data'>
                        <h3 class="title">
                            <span :class="[{active:true}]">系统登录</span>
                        </h3>
                        <el-form-item
                                prop='username'>
                            <el-input type="text" auto-complete="off" placeholder="账号"
                                      v-model='data.username'></el-input>
                        </el-form-item>

                        <el-form-item
                                prop='password'>
                            <el-input type="password" auto-complete="off" placeholder="密码"
                                      v-model='data.password'
                                      @keyup.native.enter="onLogin('data')"></el-input>
                        </el-form-item>

                        <el-form-item style="width:100%;">
                            <el-button type="primary"
                                       @click='onLogin("data")'>登录
                            </el-button>
                            <el-button @click='resetForm("data")'>重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        winSize: {
          width: '',
          height: ''
        },

        formOffset: {
          position: 'absolute',
          left: '',
          top: ''
        },

        loginActions: {
          disabled: false
        },

        data: {
          username: '',
          password: ''
        },

        dataValidate: {
          username: [{
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入用户名'));
              } else {
                if (/^[a-zA-Z0-9_-]{1,16}$/.test(value)) {
                  callback();
                } else {
                  callback(new Error('用户名至少6位,由大小写字母和数字,-,_组成'));
                }
              }
            },
            trigger: 'blur'
          }],
          password: [{
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                if (!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
                  callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'));
                } else {
                  callback();
                }

              }
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      setSize() {
        this.winSize.width = $(window).width() + "px";
        this.winSize.height = $(window).height() + "px";

        this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
        this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
      },

      onLogin(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {//true
            this.loginActions.disabled = true;
            //如果记住密码，提交的信息包括真实token，密码则是假的
            //服务端登录验证优先级：用户名必须，其次先取token，不存在时再取密码
            this.$$api_user_login(this[data], data => {
              //登录成功之后，验证是否记住密码，如果记住密码，本地保存记住信息
              //如果没有记住，就初始化本地记住信息
              var userinfo=data.userinfo;
              try {
                userinfo.web_routers = JSON.parse(userinfo.web_routers) ? JSON.parse(userinfo.web_routers) : {};
              } catch (e) {
                userinfo.web_routers = {};
              }
              try {
                userinfo.api_routers = JSON.parse(userinfo.api_routers) ? JSON.parse(userinfo.api_routers) : {};
              } catch (e) {
                userinfo.api_routers = {};
              }
              this.$store.dispatch('update_userinfo', {
                userinfo: userinfo
              }).then(() => {
                this.loginActions.disabled = false;
                if (userinfo.default_web_routers) {
                  this.$router.push(userinfo.default_web_routers);
                } else {
                  this.$router.push('/function/open/echarts');
                }
              });
            }, {
              errFn: () => {

                this.loginActions.disabled = false;
              },
              tokenFlag: true
            });
          }
        });
      },

      resetForm(ref) {
        this.$refs[ref].resetFields();
      }
    },
    created() {
      this.setSize();
      $(window).resize(() => {
        this.setSize();
      });
    }
  }

</script>

<style scoped lang="less">
  .login {
    background : #1F2D3D;

  .card-box {
    box-shadow            : 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius : 5px;
    border-radius         : 5px;
    -moz-border-radius    : 5px;
    background-clip       : padding-box;
    margin-bottom         : 20px;
    background-color      : #F9FAFC;
    border                : 2px solid #8492A6;
  }

  .title {
    margin      : 0px auto 40px auto;
    text-align  : center;
    color       : #505458;
    font-weight : normal;
    font-size   : 16px;

  span {
    cursor : pointer;

  &.active {
     font-weight : bold;
     font-size   : 18px;
   }
  }
  }

  .loginform {
    width   : 350px;
    padding : 35px 35px 15px 35px;
  }
  }
</style>

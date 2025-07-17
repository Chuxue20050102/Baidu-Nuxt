<template>
    <div class="modal">
        <div class="modal-content"   >
            <span class="close" @click="closeModal">&times;</span>
            <div class="modal-content-left" :style="{borderRight: `1px solid ${borderColor}`}">
            <img
            src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
            alt="Baidu Logo"
            class="logo2"
            >
            <img
            class="denglu-ma"
            :src="'https://passport.baidu.com/v2/api/qrcode?sign=4f0307418857f56a2dd41fa45a0e5ab2&lp=pc&qrloginfrom=pc&logPage=traceId%3Apc_loginv5_1742731694%2ClogPage%3Aloginv5'"
            alt="二维码"
            :style="{borderColor: btnColor}"
            >
            <p class="denglu-ma2"/>
            <p class="denglu-detail-1">请使用百度APP扫码登录</p>
            <div>
                <a class="downloadAPP" :style="{backgroundColor:downColor}" >
                    <img
                    src="https://www.baidu.com/favicon.ico"
                    class="icon"
                    alt="百度"
                    >
                    下载百度APP
                </a>
                <div class="downloadAPP-contant" :style="{backgroundColor:navColor}">
                    <img
                    :src="'https://passport.baidu.com/v2/api/qrcode?sign=4f0307418857f56a2dd41fa45a0e5ab2&lp=pc&qrloginfrom=pc&logPage=traceId%3Apc_loginv5_1742731694%2ClogPage%3Aloginv5'"
                    alt="二维码"
                    class="logo3"
                    :style="{borderColor: btnColor}"
                    >
                    <p>扫描二维码下载百度APP</p>
                </div>
            </div>
            </div>

            <div class="modal-content-right">
                <span class="close" @click="closeModal">&times;</span>

                <!-- 账号登录与短信登录 -->
                <span
class="zh-login" :class="['tab', { active: isZhLoginActive }]" :style="{ 
                    color: isZhLoginActive ? textColor : '', 
                    fontWeight: isZhLoginActive ? 'bold' : 'normal'
                }"  
                @click="toggleLoginTab('zh')">
                账号登录
                </span>
                <span class="dx-login" :class="['tab', { active: isDxLoginActive }]" @click="toggleLoginTab('dx')">短信登录</span>

                <!-- 账号登录内容 -->
                <div v-if="isZhLoginActive" class="login-container">
                    <input v-model="username" class="text1-1" type="text" placeholder="手机号/用户名/邮箱" :class="{'error-border': iszhanghaoEmpty}" :style="{backgroundColor:bodyColor, border: `1px solid`+ borderColor,color:textColor }" >
                    <span v-if="username" class="clear-icon" @click="clearInput('username')">×</span>
                    <input v-model="password" class="text1-2" type="password" placeholder="密码" :class="{'error-border': ismimaEmpty}" :style="{ backgroundColor: bodyColor, border: '1px solid ' + borderColor, color:textColor }" >
                    <span v-if="password" class="clear-icon2"  @click="clearInput('password')">×</span> 
                    <a class="wangji" href="https://passport.baidu.com/?getpassindex" target="_blank" >忘记密码？</a>
                    <p v-if="iszhanghaoEmpty" class="shuoming-6" :style="{color:ziColor2}">请您输入手机号/用户名/邮箱</p>
                    <p v-if="ismimaEmpty" class="shuoming-7" :style="{color:ziColor2}">请您输入密码</p>
                </div>

                <!-- 短信登录内容 -->
                <div v-if="isDxLoginActive" class="login-container">
                    <p class="shuoming">验证即登录，未注册将自动创建百度账号</p>
                    <input v-model="phoneNumber" class="text2-1" type="text" placeholder="请输入手机号" :class="{'error-border': isPhoneEmpty || isPhoneInvalid}" :style="{backgroundColor:bodyColor, border: `1px solid ${borderColor}`,color:textColor}">
                    <span v-if="phoneNumber" class="clear-icon" @click="clearInput('phoneNumber')">×</span>
                    <input v-model="verificationCode" class="text2-2" type="text" placeholder="验证码"  :class="{'error-border': isVerificationRequired}" :style="{backgroundColor:bodyColor, border: `1px solid ${borderColor}`,color:textColor}" >
                    <!-- 发送验证码按钮 -->
                    <div class="dx-ma">
                        <button v-if="!hasSentCode" class="sendcode" :style="{background:navColor}" @click="sendVerificationCode"> 发送验证码</button>
                        <button v-else :class="isCountingDown ? 'daojishi' : 'resend-text'"  @click="sendVerificationCode">
                            {{ isCountingDown ? `${countdown}秒` : "重新发送" }}
                        </button>
                    </div>
                    <p v-if="isPhoneEmpty" class="shuoming-3" :style="{color:ziColor2}">请填写手机号</p>
                    <p v-else-if="isPhoneInvalid" class="shuoming-2" :style="{color:ziColor2}">手机号码格式不正确</p>
                    <p v-if="isVerificationRequired"  class="shuoming-5" :style="{color:ziColor2}">请填写验证码</p>
                    <p v-if="isSmsNotReceived" class="shuoming-4" :style="{color:textColor}">收不到短信验证码？</p>
                </div>

                <!-- 登录按钮 -->
                <button  
                    class="login-bt" :style="{ opacity: isCheckboxChecked ? 1 : 0.4 ,
                        backgroundColor: btnColor
                    }" 
                    :disabled="!isCheckboxChecked" 
                    @click="handleLogin"
                    >登录
                </button>

                <!-- 协议勾选框 -->
                <input v-model="isCheckboxChecked" type="checkbox" class="ck-box" >
                <div class="xieyi" :style="{color:' #aaaaaa'}">
                阅读并接受
                    <a class="xieyi-1" href="https://passport.baidu.com/static/passpc-account/html/protocal.html" target="_blank">百度用户协议</a>
                    和
                    <a class="xieyi-1" href="https://privacy.baidu.com/policy/PrivacyPolicy" target="_blank" >隐私政策</a>
                </div>
            </div>

            <div class="modal-content-bottom" :style="{borderTop:`1px solid ${borderColor}`}">
                <img class="QQ" src="https://passport.baidu.com/passApi/img/bd-acc-qzone.png" alt="QQ" @click="openQQLogin" >
                <img class="weibo" src="https://passport.baidu.com/passApi/img/bd-acc-tsina.png" alt="微博" @click="openWeiboLogin" >
                <img class="wechat" src="https://passport.baidu.com/passApi/img/bd-acc-weixin.png" alt="微信" @click="openWeChatLogin" >
                <a href="https://passport.baidu.com/v2/?reg" class="register" >立即注册</a>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    // 登录浮窗显示
    const emit = defineEmits(['close'])
    const closeModal = () => { emit('close') }

    // 颜色和控制变量，解构出来
    const { navColor, bodyColor, textColor, btnColor, borderColor, downColor, ziColor, ziColor2 } = defineProps({
        navColor: { type: String, default: '#fff' },
        bodyColor: { type: String, default: '#fff' },
        textColor: { type: String, default: '#333' },
        btnColor: { type: String, default: '#4e6ef2' },
        borderColor: { type: String, default: '#ccc' },
        downColor: { type: String, default: '#f5f5f6' },
        ziColor: { type: String, default: '#222' },
        ziColor2: { type: String, default: 'red' }
    });
    const isCheckboxChecked = ref(false);
    const isDxLoginActive = ref(false);
    const isZhLoginActive = ref(true);
    const phoneNumber = ref('');
    const verificationCode = ref('');
    const username = ref('');
    const password = ref('');
    const isPhoneEmpty = ref(false);
    const isPhoneInvalid = ref(false);
    const isSmsNotReceived = ref(false);
    const isCountingDown = ref(false); //true时为倒计时，按钮禁用
    const countdown = ref(59);
    const hasSentCode = ref(false); 
    const isVerificationRequired = ref(false); // 控制“请填写验证码”的显示
    const iszhanghaoEmpty = ref(false);
    const ismimaEmpty = ref(false);



    // 短信登录和账号登录切换
    const toggleLoginTab = (tab: 'zh' | 'dx') => {
    isZhLoginActive.value = tab === 'zh';
    isDxLoginActive.value = tab === 'dx';
    };


      // 手机号校验
      const validatePhone = () => {
          const phoneValue = phoneNumber.value.trim(); //获取手机号
          isPhoneEmpty.value = phoneValue === ''; //为空，值为true，按钮禁用
          isPhoneInvalid.value = !/^\d{11}$/.test(phoneValue); //格式正确，返回true
      };

      // 发送验证码
      let timer: ReturnType<typeof setInterval> | null = null;
      const sendVerificationCode = () => {
          validatePhone(); // 先校验手机号

          if (isPhoneEmpty.value)  return;
          if (isPhoneInvalid.value)  return; 

          // 如果手机号正确，继续执行发送验证码逻辑
          if (isCountingDown.value) return;
          
          isCountingDown.value = true;
          countdown.value = 59;
          isSmsNotReceived.value = false;
          hasSentCode.value = true;

          if (timer) clearInterval(timer); // 避免重复定时器

          timer = setInterval(() => {
              countdown.value--;
              if (countdown.value === 49) isSmsNotReceived.value = true;
              if (countdown.value <= 0) {
                  clearInterval(timer!);
                  timer = null; // 释放定时器
                  isCountingDown.value = false;
              }
          }, 1000);

      };

      //校验
  const handleLogin = () => {
      if (isDxLoginActive.value) {
          validatePhone(); // 先校验手机号
          if (isPhoneEmpty.value) return; // 手机号为空，直接返回
          if (isPhoneInvalid.value) return; // 手机号格式错误，直接返回

          // 手机号正确，才检查验证码是否填写
          if (verificationCode.value.trim() === '') {
              isVerificationRequired.value = true; // 需要验证码
          } else {
              isVerificationRequired.value = false; // 通过验证，不显示提示
          }
      }

      if (isZhLoginActive.value) {
          // 如果用户名为空，设置提示
          if (username.value.trim() === '') {
              iszhanghaoEmpty.value = true;
          } else{ 
              iszhanghaoEmpty.value = false; 
          }
          if (username.value.trim() !== ''&& password.value.trim() === '') {
              ismimaEmpty.value = true;
          }else {
              ismimaEmpty.value = false;  // 密码不为空，取消提示
          }
      }
  };

  // 支持参数的 clearInput
  const clearInput = (field?: 'username' | 'password' | 'phoneNumber') => {
    if (field === 'username') username.value = '';
    else if (field === 'password') password.value = '';
    else if (field === 'phoneNumber') phoneNumber.value = '';
    else {
      phoneNumber.value = '';
      isPhoneEmpty.value = false;
      isPhoneInvalid.value = false;
    }
  };

  const openQQLogin = () => {
    window.open('https://graph.qq.com/oauth2.0/show?which=Login&display=pc', '_blank', 'width=800,height=540');
  };
  const openWeiboLogin = () => {
    window.open('https://api.weibo.com/oauth2/authorize?client_id=2512457640&response_type=code&redirect_uri=https://passport.baidu.com/phoenix/account/afterauth', '_blank', 'width=800,height=1000');
  };
  const openWeChatLogin = () => {
    window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wx85f17c29f3e648bf&response_type=code&scope=snsapi_login&redirect_uri=https://passport.baidu.com/phoenix/account/afterauth', '_blank', 'width=900,height=540');
  };
</script>

<style scoped>
/*||登录*/
/* 模态框的背景遮罩 */
.modal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
/*||登录整个浮窗布局*/
.modal-content{
  display:grid;
  position:fixed;
  z-index:100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 720px;
  height: 360px;
  text-align: center;
  margin: 0px;
  padding: 0px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.modal-content-left{
  width:340px;
  height:280px;
  margin: 10px;
}
.modal-content-right {
  width: 340px;
  height:280px;
  margin: 10px;
}
.modal-content-bottom{
  width:693px;
  height: 35px;
  grid-column: span 2;
  margin-top: 5px;
  padding: 13px;
}


/*||登录左边部分*/
.denglu-ma2 {
  position: fixed;
  width: 130px;
  height: 160px;
  top: 17%;
  left: 27.5%;
  margin: 5px;
  background: url(https://s21.ax1x.com/2024/12/25/pAvCzLj.png) no-repeat center center / 108.9px 129.6px;
}
.denglu-ma{
  position: absolute;
  top:80px;
  padding: 10px;
  width: 110px;
  height: 110px;
  border: 1px solid #adabab; 
  border-radius:10px;
  left: 4%;
}
.logo2{
  position: absolute;
  height:50px;
  width:110px;
  top:3px;
  left: 2%;
}
.denglu-detail-1{
  position: absolute;
  font-size: 15px;
  top: 60%;
  left:100px;
}
.icon{
  height:15px;
  width:15px;
  position: absolute;
  top:27%;
  left:13%;
  color: #3385ff;
}
.downloadAPP{
  position: absolute;
  font-size: 12px;
  top: 72%;
  color: #4e6ef2;
  left:110px;
  background-color: #f3f1f1;
  padding: 5px 20px 5px 35px;
  border-radius:8px;
}
.downloadAPP:hover{
  opacity:  0.5;
  cursor: pointer; 
}
.downloadAPP-contant{
  display:none;
  position: absolute;
  font-size:15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  z-index: 100;
  margin: 10px;
  left:6px;
  background-color:  #fffcfc;
  border-radius: 10px;
  width:320px;
  height:235px;

}
.downloadAPP:hover + .downloadAPP-contant{
  display:block;
} 
.logo3{
  border: 1px solid #adabab; 
  border-radius:10px;
  padding: 10px;
  width: 110px;
  height: 110px;
  margin-top: 30px;
}


/*||登录底部部分*/
.register{
  position: absolute;
  right: 2%;
  bottom: 5%;
  color:#4e6ef2;
  font-size: 15px;
}
.QQ,.weibo,.wechat{
  position: absolute;
  height: 25px;
  width: 25px;
  cursor: pointer; 
}
.QQ{
  left:4%;
}
.weibo{
  left: 10%;
}
.wechat{
  left: 16%;
}



/*||登录右边部分*/
.close{
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 30px;
  cursor: pointer;
  color: #a5a1a1;
}
.tab {
  display: inline-block;
  cursor: pointer;
  color: gray;
  margin-top:15px;
  font-size:16px;
  border-radius: 5px;
  background-color: transparent;
  position: absolute;
}
.zh-login{
  right:31%;
  margin-right: 30px;
  top:3%;
}
.dx-login{
  right:21%;
  top:3%;
}
.tab.active {
  color: #222;
  font-weight: bold;
  text-decoration: underline solid 2px blue;
  text-underline-offset: 8px;
}
.login-container {
  margin-top: 10px;
  position: absolute;
  top:20%;
  left: 52%;
}

.login-container.active {
  display: block;
}
.text1-1, .text1-2, .text2-1, .text2-2{
  height: 22px;
  width: 270px;
  margin-bottom: 15px;
  border-radius: 8px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid rgb(176, 174, 174);
  font-size: 16px;
  font-weight: 500;
}
.text1-1:focus, .text1-2:focus, .text2-1:focus, .text2-2:focus{
  border-color:#226acc;
  outline: none;
  box-shadow: 0 0 0 2px rgb(200, 220, 249);
}
.error-border {
border-color: red;
box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

a.wangji {
  color:#4e6ef2;
  text-decoration: none;
  position: absolute;
  top:95%;
  right:5%;
  font-size:13px;
}
.shuoming{
  font-size:10.5px;
  color:gray;
  position: absolute;
  left:7%;
  top:-30%;
}
.shuoming-2, .shuoming-3 ,.shuoming-5 ,.shuoming-6 ,.shuoming-7{
  position: absolute;
  top:80%;
  font-size: 12px;
  left:7%;
  color: red;
}
.shuoming-4{
  position: absolute;
  color:#4e6ef2;
  font-size: 10px;
  left:62%;
  top: 80%;
}
.xieyi{
  position: absolute;
  bottom: 17%;
  font-size: 12px;
  right: 8%;
  color: #626675;
}
.ck-box{
  position: absolute;
  bottom: 17.5%;
  right: 37%;
}
.xieyi-1{
  color: #4e6ef2;
}
.login-bt{
  position: absolute;
  top:62%;
  left:55.5%;
  height: 43px;
  width: 297px;
  border-radius: 8px;
  border:none;
  color: white;
  font-weight:bold;
  background-color:#4e6ef2;
  opacity: 0.4;
  box-shadow: 0 6px 16px 0 rgb(78 111 242 / 30%);
}
.clear-icon{
  position: absolute;
  right:7%;
  top:10%;
  font-size: 20px;
  color: #9195a3;
  cursor: pointer;
}
.clear-icon2{
  position: absolute;
  right:7%;
  top:60%;
  font-size: 20px;
  color: #9195a3;
  cursor: pointer;
}

.sendcode,.daojishi , .resend-text{
  position: absolute;
  left: 68%;
  font-size: 15px;
  color: #4e6ef2;
  top:58%;
  border: none;
  background-color: white;
  border-left:1px solid rgb(203, 200, 200);
}
.daojishi{
  position: absolute;
  left: 80%;
}
.resend-text{
  position: absolute;
  left: 70%;
}
.sendcode:hover,.daojishi:hover , .resend-text:hover{
  background-color: white;
}

</style>
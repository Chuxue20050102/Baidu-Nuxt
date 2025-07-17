<template>
  <div class="aside">
  <div class="fuzhu" @click="toggleFuzhu">
        <div class="fuzhu-beijing"/>
        <div class="fuzhu-tu" tabindex="0"/> 
        <div class="fuzhu-content">辅助模式</div>
  </div>
    <AppFuzhuMode />
  <div class="saoma">
      <div class="tu-1" tabindex="0"/>
      <div class="text">
          <div class="text-content">
          <div class="text-2">[-] 百度APP扫码登录</div>
          <div class="text-3">百度一下&nbsp;生活更好</div>
          </div>
          <img class="ma" alt="二维码" :src="'https://passport.baidu.com/v2/api/qrcode?sign=4f0307418857f56a2dd41fa45a0e5ab2&lp=pc&qrloginfrom=pc&logPage=traceId%3Apc_loginv5_1742731694%2ClogPage%3Aloginv5'" >
      </div>
  </div>
</div>
</template>

<script setup>
import { useFuzhuMode } from '../composables/useFuzhuMode'
import AppFuzhuMode from './AppFuzhuMode.vue'
const showFuzhuMode = useFuzhuMode()
function toggleFuzhu() {
  showFuzhuMode.value = !showFuzhuMode.value
}
// watch(showFuzhuMode, (newVal) => {
//   if (newVal) {
//     document.body.classList.add('neirong');
//     document.body.classList.add('show');
//   } else {
//     document.body.classList.remove('neirong');
//     document.body.classList.remove('show');
//   }
// });

</script>

<style scoped>
.aside {
  position: fixed;
  height: 90px;
  right: 24px;
  bottom: 64px;
  background-color: #fbfbfb;
  width: 44px;
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
}
.fuzhu {
  line-height: 44px;
  cursor: pointer;
  box-sizing: border-box;
  padding-top: 12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.fuzhu-tu {
  width: 18px;
  height: 18px;
  margin: 3px auto;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA7VBMVEUAAAD////////s8v////+txP+qwv+4zf/w9f/2+P+hu//Q3f+yyP+4zf/Q3f////+kvv+90P+80f+2yv/S4P/T4P/M2//z9/+cuP/V4P9Whv////9Uhf9Sg/9Pgf9NgP/8/f9di/9Xh/9lkf5aif9qlP7z9//k7P/c5v+2y/94nv51nP6lv/+LrP6Ep/6BpP5gjf7v9P+wxv/U4f/M2/+sxP+vxv73+f/P3v/J2v+5zf+ivP+fuv9xmf+Ytv6Usv6Hqf58of5vl/7m7v/g6f+zyf6QsP75+//q8P/B0v/W4//C1P6+0P6qwv6ct/76fHZiAAAAGnRSTlMAGAaVR/Py45aC9Mfy2b8t9OPZ2ce/v4L0x/e74/EAAAIZSURBVDjLZVPXYuIwEDSmQ4BLv5O0ku3Yhwu2IZTQe0hy7f8/57QSoYR5sVea1c424wgzl324LRRuH7I507hEJluYucCFEOBGhWzmy7X5+N0WwIjTbrcdBsKulM0z96onGCGE2X6n+cTkj/CqJ480igzkNXp26E9JkABSbBz8i4Bn3EkH840mKHoxs49fZQzt2Kd03FQEzSB3WsejB9Jqf1CJQBM0wCurABWBoub0gkDENwyStTHA62pwSWDtklRQ4FLfjnaiPqVW60hAYeLKNHIREOZuKTL80H6XBFCwn4BAmDOyLiOQUIlOSEjaoS+Ju57NZuul73Fml4w6yAivSLBW3MGfcfBmIegmArg3alICdJHgy1jQt8Z/6CcC4DdGXhLIoiWRACpbLYbDYW80GnXp2GH8ShP+PUvEoHsAIFq9Xm8+kXlIwkkI9pm+05Tm3yWqu9EiB0pkwjWBx2i+tND1XqeZqpPU4VhUbq/ekR8CwTRVoRxf3ifTbeIwcONNsJZ2lxFVKDMv1KNvS2zXdrnD+COvR1PQpTZKNlKD3cLCOJNnivgVxkw169BunlKFaV9/B+LQbqOsByY4IVgDB59dl/cjR9TIJV1Lh7CGqUqH/DDPhhZYOPkdLz6m0X7GrzPHsSe6zJwzxvm+5NeNi8U5ABfn7mz7zHJFrZ6+BY6rd7m8kQtcAtwwXzq4n69/vZbP1+pn6/8fsrRmHUhmpYYAAAAASUVORK5CYII=) no-repeat;
  background-size: 16px;
  background-position: center;
  border-radius: 50%;
  border: 1px solid #626675;
}
.fuzhu-tu:hover {
  width: 18px;
  height: 18px;
  margin: 3px auto;
  background-position: center;
  background-size: 16px;
  border: 1px solid #626675;
  box-shadow: 0 0 0 10px #f9f8f8, 0 4px 20px rgba(88, 86, 86, 0.904);
  border-radius: 50%;
  cursor: pointer;
}
.fuzhu-tu:hover+.fuzhu-content {
  display: flex;
}
.fuzhu-content {
  position: absolute;
  display: none;
  right: 110%;
  top: 26%;
  transform: translateY(-50%);
  width: 90px;
  height: 30px;
  border-radius: 8px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
  background-color: #fff;
}
.saoma {
  width: 100%;
  border-radius: 50%;
  padding: 10px 0;
  cursor: pointer;
  position: relative;
}
.tu-1{
  background: url(https://pss.bdstatic.com/static/superman/img/qrcode/qrcode@2x-daf987ad02.png);
  width: 24px;
  height: 24px;
  margin: 2px auto;
  background-size: 24px;
}
.tu-1:hover{
  position: absolute;
  top: 10%;
  left: 22%;
  background:url(https://pss.bdstatic.com/static/superman/img/qrcode/qrcode-hover@2x-f9b106a848.png);
  background-position: center;
  background-size: 16px;
  width: 24px;
  height: 24px;
  margin-top: 10px ;
  background-size: 24px;
  border-radius: 50%;
  box-shadow: 0 0 0 10px #fbfbfb,  0 4px 20px rgba(88, 86, 86, 0.904); 
}
.text {
  position: absolute;
  top: -10px;
  left: -160px;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
  background-color: #fff;
  width: 300px;
  height: 110px;
  border-radius: 15px;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 16px 8px 16px 20px;
  box-sizing: border-box;
}
.saoma:hover .text {
  display: flex;
}
.ma {
  width: 80px;
  height: 80px;
  float: right;
}
.text-2,
.text-3 {
  float: left;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
}
.text-2 {
  margin-bottom: 5px;
  font-family: cIconfont !important;
  font-style: normal;
  margin-right: 4px;
  font-size: 19px;
}
.text-3 {
  font-size: 14px;
  color: #9195a3;
}
.text-content {
  flex-direction: column;
}
.fuzhu-div.show {
  display: flex;
  top: 0;  /* 弹窗滑入到页面顶部 */
  height: 100px;
  width: 100%;
  z-index: 9999; 
}
/* .fuzhu-active {
  padding-top: 100px; 
  transition:padding-top 0.6s ease; 
}
.fuzhu-active .neirong {
  margin-top: 100px;  
  transition: margin-top 0.4s ease; 
} */
.fuzhu-div {
  position: fixed;  /* 弹窗固定位置 */
  top: -100%;  /* 初始时隐藏，向上移 */
  background-color: #505050 ;
  margin-left: 0;
  left:0px;
  cursor: pointer;
  justify-content: center;
  font-size: 14px;
  transition: top 0.6s ease; 
}
.fuzhu-single {
  display: flex;
  margin-top: 10px;
  display:inline-block;          
  flex-direction: column;       
  text-align: center;
  color: white;
  margin-right: 3px;
}
.fuzhu-btn-tu, .fuzhu-ps{
  margin-top: 8px;
}
.fuzhu-ps{
  display: flex;
}
.fuzhu-btn, .fuzhu-btn-2, .ps {
  width: 65px;
  height: 50px;
  border-radius: 5px;
  margin-bottom: 3px;
}
.fuzhu-btn {
  position: relative;
}
.fuzhu-btn-2 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: none;
}
.fuzhu-btn:focus + .fuzhu-btn-2 {
  display: block;
}
.ydfw{
  margin: 10px;
  margin-right: 30px;
}
.dp-btn{
  width: 100px;
  height: 50px;
}
.ps{
  display: none;
  border-radius: 6px;
}
.ps:first-child {
  display: block;
}
</style> 

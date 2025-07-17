<template>
  <!-- 页脚内容 -->
  <footer class="footer-style" :style="{ backgroundColor: navColor, color: textColor }">
    <a href="https://home.baidu.com/" target="_blank">关于百度</a>
    <a href="https://ir.baidu.com/" target="_blank">About Baidu</a>
    <a href="https://www.baidu.com/duty/" target="_blank">使用百度前必读</a>
    <a href="https://help.baidu.com/question?prod_id=1" target="_blank">帮助中心</a>
    <a href="https://e.baidu.com/?refer=1271" target="_blank">企业推广</a>
    <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">京公网安备11000002000001</a>
    <a href="https://beian.miit.gov.cn/" target="_blank">京ICP证030173号</a>
    <a href="#" target="_blank">京ICP证030173号互联网新闻信息服务许可证11220180008</a>
    <a href="#" class="lunyi-1">
      <span class="lunyi-2"/>
    </a>
    <div class="jihe">
      <span class="jihe-biao">^</span>
      <div class="jihe-content">
        <p>京ICP证030173号互联网新闻信息服务许可证11220180008</p>
        <p>网络文化经营许可证： 京网文〔2023〕1034-029号</p>
        <a href="https://www.baidu.com/licence/" target="_blank">信息网络传播视听节目许可证 0110516</a>
        <p>互联网宗教信息服务许可证编号：京（2022）0000043</p>
        <p>药品医疗器械网络信息服务备案（京）网药械信息备字（2021）第00159号</p>
        <p>医疗器械网络交易服务第三方平台备案凭证（京）网械平台备字（2020）第00002号</p>
        <p>药品网络交易服务第三方平台备案凭证（京）网药平台备字〔2023〕第000002号</p>
        <p>©2024 Baidu </p>   
      </div>   
    </div>
  </footer>
</template>
<script setup>
const { navColor, textColor } = defineProps({
  navColor: { type: String, default: '#fff' },
  textColor: { type: String, default: '#333' }
})
</script>
<style scoped>
footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  font-size: 0.75em;
  background-color: white;
  margin-left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  overflow: visible;
  padding-left: -10px;
  white-space: nowrap;
}
footer a {
  size: 0.75em;
  color: #bbb;
  padding: 8px;
  white-space: nowrap;
}
lunyi-2 {
  font-family: cIconfont !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
lunyi-1 {
  margin-left: 3px;
  margin-right: 9px;
  position: relative;
  display: inline-block;
  width: 20px;
}
.jihe {
  display: inline-block;
  position: relative;
  cursor: pointer;
  color: #767474;
  font-size: 20px;
}
.jihe-biao{
  margin-top: 5px;
}
.jihe-content {
  display: none;
  position: absolute;
  bottom: 100%;
  left: -440px;
  color: #bbb;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 10px;
  font-size: 16px;
  z-index: 9999;
  transform: translateY(-8px);
}
.jihe-content{
  margin: -5px -5px;
}
.jihe:hover .jihe-content {
  display: block;
  height: auto;
}
.jihe-content p {
  font-size: 12px;
  display: block;
  white-space: nowrap;
  margin: 0.3px;
}
.jihe-content a {
  font-size: 12px;
  display: block;
  white-space: nowrap;
  padding-bottom: 0;
  padding-top: 0;
  padding-left: 0;
}
</style> 
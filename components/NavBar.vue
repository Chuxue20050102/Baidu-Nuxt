<template>
  <div
    :style="{
      transform: showFuzhuMode ? 'translateY(100px)' : 'none',
      transition: 'transform 0.4s'
    }"
    class="nav"
  >
    <div class="left">
      <a v-for="nav in navs" :key="nav.text" :href="nav.href" target="_blank" class="nav-ct">{{ nav.text }}</a>
      <div class="more">
        <a href="https://www.baidu.com/more/" class="nav-ct" @click.prevent>更多</a>
        <div class="more-content">
          <div v-for="(subItem, subIndex) in items" :key="subItem.link" class="more-content-item">
            <a :href="subItem.link" target="_blank">
              <img :src="subItem.imgSrc" :alt="subItem.alt">
              <div class="Wenzi">{{ subItem.text }}</div>
            </a>
          </div>
          <div class="last">
            <a href="https://www.baidu.com/more/" target="_blank">
              <div class="gray Wenzi">查看百度全部产品&gt;</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="settings">
        <a class="shezhi nav-ct">设置</a>
        <div class="settings-show">
          <a href="#" class="nav-ct">搜索设置</a>
          <a href="#" class="nav-ct">高级搜索</a>
          <a href="#" class="nav-ct">关闭预测</a>
          <a href="#" class="nav-ct">隐私设置</a>
          <a href="#" class="nav-ct">关闭热搜</a>
        </div>
      </div>
      <button class="denglu" @click="openModal">登录</button>
      <Teleport to="body">
      <AppLogin
        v-if="showLoginModal"
        v-bind="currentColors"
        :key="JSON.stringify(currentColors)"
        @close="closeModal"
      />
    </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">

import AppLogin from './AppLogin.vue'
import { useTheme } from '../composables/useTheme'
import { useFuzhuMode } from '../composables/useFuzhuMode'
import { useLoginModal } from '../composables/useLoginModal'

const showFuzhuMode = useFuzhuMode()
const showLoginModal = useLoginModal()
const currentColors = useTheme()

// interface MoreItem {
//   link: string;
//   imgSrc: string;
//   alt: string;
//   text: string;
// }

const navs = [
  { text: '新闻', href: 'https://news.baidu.com/' },
  { text: 'hao123', href: 'https://www.hao123.com/?src=from_pc' },
  { text: '地图', href: 'https://map.baidu.com/' },
  { text: '贴吧', href: 'https://tieba.baidu.com/' },
  { text: '视频', href: 'https://haokan.baidu.com/?sfrom=baidu-top' },
  { text: '图片', href: 'https://image.baidu.com/' },
  { text: '网盘', href: 'https://pan.baidu.com/?from=1026962h' },
  { text: '文库', href: 'https://wenku.baidu.com/?fr=bdpcindex' },
  { text: 'AI助手', href: 'https://chat.baidu.com/search?isShowHello=1&pd=csaitab&setype=csaitab&extParamsJson=%7B%22enter_type%22%3A%22home_tab%22%7D' }
]

const items = [
  {
    link: "http://fanyi.baidu.com/",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/newfanyi-da0cea8f7e.png",
    alt: "翻译",
    text: "翻译"
  },
  {
    link: "http://xueshu.baidu.com/",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/newxueshuicon-a5314d5c83.png",
    alt: "学术",
    text: "学术"
  },
  {
    link: "https://baike.baidu.com",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/newbaike-889054f349.png",
    alt: "百科",
    text: "百科"
  },
  {
    link: "https://zhidao.baidu.com",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/newzhidao-da1cf444b0.png",
    alt: "知道",
    text: "知道"
  },
  {
    link: "https://jiankang.baidu.com/widescreen/home",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/newjiankang-f03b804b4b.png",
    alt: "健康",
    text: "健康"
  },
  {
    link: "http://e.baidu.com/ebaidu/home?refer=887",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/yingxiaoicon-612169cc36.png",
    alt: "营销推广",
    text: "营销推广"
  },
  {
    link: "https://live.baidu.com/",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/newzhibo-a6a0831ecd.png",
    alt: "直播",
    text: "直播"
  },
  {
    link: "http://m//pss.bdstatic.com/static/superman/img/topnav/newyinyue-03ecd1e9b9.png",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/newyinyue-03ecd1e9b9.png",
    alt: "音乐",
    text: "音乐"
  },
  {
    link: "https://cp.baidu.com/?sa=bdindex",
    imgSrc: "https://pss.bdstatic.com/static/superman/img/topnav/chengpian-9981cd1fdb.png",
    alt: "橙篇",
    text: "橙篇"
  }
]

const openModal = () => { showLoginModal.value = true }
const closeModal = () => { showLoginModal.value = false }
</script>
<style scoped>
/*||导航栏整体 */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100.5%;
  font: 13px / 23px Arial, sans-serif;
  padding:18px 0px 18px 8px;
  margin-left: -8px;
  margin-top: -8px;
  position: relative;   
}
.left {
  float: left;
  justify-content: flex-start;
  align-items: center;
  gap: 23px;
  margin-left: 15px;
}
.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 23px;
  margin-right: 20px;
}
.nav-ct{
  margin-right:20px;
  color: #222;
  text-decoration: none;
}
.nav-ct:hover{
  color:#3385ff;
}


/* ||更多的基础样式 */
.more{
  position: relative;
  display: inline-block;
}
.more:hover  .more-content {
  display: grid;
}
.more-content:hover , .more-content-item:hover{
  display: grid;
}
.more-content {
  display: none;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ebeaea;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 230px;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  grid-template-rows: auto;
  border-radius: 15px;
  left: -190px;
  top: 25px;
  z-index: 10;
  margin: -2px -2px;
}
.more-content-item{
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6px;
}
.more-content img {
  width: 40px;
  height: 40px;
  border: 1px solid rgb(248, 246, 246);
  border-radius: 10px;
  margin: 8px 8px 1px 8px;

}
.last {
  grid-column: span 3;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.dropdown-content .gray {
  color: gray;
  size: 3px;
}

/* 文字和图片 */
.more-content-item a:hover {
  color:  #3385ff;
  background-color: #e1ecfc;
  border-radius: 10px;
}
/* 最后一项 */
.last :hover {
  width: 210px;
  background-color: #e1ecfc;
  color: #3385ff;
  border-radius: 8px;
}
.Wenzi {
  size: 3px;
  text-align: center;
}
.gray{
  padding-bottom: 3px;
  padding-top: 5px;
}
.darkBg .more-content-item a:hover
{
  background-color: transparent;
}
.darkBg .more-content-item:hover .Wenzi,
.darkBg .more-content-item:focus-within .Wenzi,
.darkBg .gray:hover{
  color:gray;
}
.darkBg .last :hover{
  background-color: transparent;
}
.whiteBg .more-content-item:hover .Wenzi,
.whiteBg .more-content-item:focus-within .Wenzi,
.whiteBg .gray:hover{
  color: #3385ff;
}

/* ||设置的基本样式 */
.settings {
  position: relative;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  display: inline-block;
}
.shezhi{
  margin-right:7px;
}
.settings:hover .settings-show {
  display: block;
}
.settings-show {
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: auto;
  border-radius: 10px;
  z-index: 9999;
  text-align: center;
  width: 80px;
  right: -20px;
  top: 27px;
  margin:-4px -4px;
}
.settings-show a {
  display: block;
  margin: 5px;
}

/*||登录按钮样式 */
.denglu {
  padding: 3px 11px 4px 11px;
  background-color:  #4e6ef2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #226acc;
}
</style> 
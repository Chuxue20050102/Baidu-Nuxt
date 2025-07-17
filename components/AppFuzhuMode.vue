<template>
    <div v-if="showFuzhuMode" class="fuzhu-div show">
        <img class="ydfw" src="https://s21.ax1x.com/2024/12/24/pAjGvu9.png" alt="阅读服务设置" >
        <div class="fuzhu-single fz-f">
        <span>读屏专用</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn dp-btn" src="https://s21.ax1x.com/2024/12/29/pAxDeyt.png" alt="读屏" style="width:90px; height:50px;" >
            <img class="fuzhu-btn-2 dp-btn" src="https://s21.ax1x.com/2025/01/02/pEpC2SP.png" alt="读屏" style="width:80px; height:50px;" >
        </div>
        </div>
        <div class="fuzhu-single fz-f">
        <span>声音开关</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2024/12/29/pAxDMTS.png" alt="声音" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/03/pEp8v26.png" alt="声音" >
        </div>
        </div>
        <div class="fuzhu-single fz-f">
        <span>语速</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2024/12/29/pAxD1YQ.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/08/pECEGYF.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
        <span>阅读方式</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2024/12/29/pAxDlFg.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/08/pECElwV.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
        <span>配色</span>
            <div class="fuzhu-ps" @click="changeColor">
            <img 
                v-for="(image, index) in images" 
                :key="index" 
                :src="image.src" 
                :alt="image.alt" 
                class="ps" 
                :style="{ display: currentIndex === index ? 'inline-block' : 'none' }" 
            >
            </div>
        </div>
        <div class="fuzhu-single">
        <span>放大</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2024/12/29/pAxDuef.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/02/pEpCWy8.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
        <span>缩小</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2025/01/02/pESg0hV.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/03/pEp8j8x.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
        <span>鼠标样式</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2025/01/02/pESgdkq.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/03/pEp8L5R.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
        <span>十字线</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2025/01/02/pESgDpT.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/03/pEpGprD.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
        <span>大屏幕</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2024/12/29/pAxDdTU.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/02/pEpCRQf.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
        <span>重置</span>
        <div class="fuzhu-btn-tu">
            <img class="fuzhu-btn" src="https://s21.ax1x.com/2024/12/29/pAxDawT.png" alt="" >
            <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/02/pEpCcWt.png" alt="" >
        </div>
        </div>
        <div class="fuzhu-single">
            <span>固定</span>
            <div class="fuzhu-btn-tu">
                <img class="fuzhu-btn" src="https://s21.ax1x.com/2025/01/02/pESgU7n.png" alt="">
                <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/02/pEpCfOS.png" alt="">
            </div>
        </div>
        <div class="fuzhu-single">
            <span>说明</span>
            <div class="fuzhu-btn-tu">
                <img class="fuzhu-btn" src="https://s21.ax1x.com/2025/01/02/pESgwt0.png" alt="">
                <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/03/pEp8XP1.png" alt="">
            </div>
        </div>
        <div class="fuzhu-single">
            <span>退出服务</span>
            <div class="fuzhu-btn-tu" @click="onExitFuzhu">
                <img class="fuzhu-btn" src="https://s21.ax1x.com/2025/01/02/pESgscF.png" alt="">
                <img class="fuzhu-btn-2" src="https://s21.ax1x.com/2025/01/08/pECEQe0.png" alt="">
            </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useFuzhuMode } from '../composables/useFuzhuMode'

const showFuzhuMode = useFuzhuMode()
const emits = defineEmits(['update-colors', 'close'])

// 配色图片和索引
const images = [
  { src: 'https://s21.ax1x.com/2024/12/29/pAxDKw8.png', alt: '配色蓝' },
  { src: 'https://s21.ax1x.com/2025/01/02/pEpC4eg.png', alt: '配色棕' },
  { src: 'https://s21.ax1x.com/2025/01/02/pEpC5wQ.png', alt: '配色黑' },
  { src: 'https://s21.ax1x.com/2025/01/02/pEpCIoj.png', alt: '配色绿' },
  { src: 'https://s21.ax1x.com/2025/01/03/pEp8qa9.png', alt: '配色白' }
]
const bgColors = ['#fff', '#00294a', '#4e2222', '#000000', '#1b6f1b']
const currentIndex = ref(0)

// 颜色切换核心逻辑
function applyColor(
  navColor: string,
  bodyColor: string,
  textColor: string,
  btnColor: string,
  borderColor: string,
  biaoColor: string,
  downColor: string,
  ziColor: string,
  ziColor2: string
) {
  document.documentElement.style.setProperty('--testColor', textColor)
  document.body.style.backgroundColor = bodyColor
  document.body.style.color = textColor

  nextTick(() => {
    const q = (s: string) => document.querySelector(s) as HTMLElement | null
    const qa = (s: string) => document.querySelectorAll<HTMLElement>(s)

    const isDark = bodyColor !== '#fff'
    const setHover = (el: HTMLElement, enterColor: string, leaveColor: string) => {
      el.addEventListener('mouseenter', () => el.style.color = enterColor)
      el.addEventListener('mouseleave', () => el.style.color = leaveColor)
    }

    const nav = q('.nav')
    const navct = qa('.nav a')
    if (nav) nav.style.backgroundColor = navColor
    navct.forEach(link => {
      const defaultColor = isDark ? 'white' : 'black'
      const hoverColor = isDark ? '#bbb' : 'blue'
      link.style.color = defaultColor
      setHover(link, hoverColor, defaultColor)
    })

    const footer = q('.footer-style')
    const footerzi = qa('.footer-style a')
    if (footer) footer.style.backgroundColor = navColor
    footerzi.forEach(el => setHover(el, isDark ? 'white' : 'black', '#bbb'))

    const settingsShow = q('.settings-show')
    if (settingsShow) {
      settingsShow.style.backgroundColor = bodyColor
      settingsShow.style.border = 'none'
    }
    document.body.classList.toggle('whiteBg', !isDark)
    document.body.classList.toggle('darkBg', isDark)

    const morecontent = q('.more-content')
    if (morecontent) {
      morecontent.style.backgroundColor = navColor
      morecontent.style.border = 'none'
      morecontent.style.color = 'none'
    }

    const resouTitle1 = q('.resou-title1')
    const resouChange = q('.resou-change')
    if (resouTitle1) resouTitle1.style.color = textColor
    if (resouChange) resouChange.style.color = textColor

    qa('.biao').forEach(span => span.style.backgroundColor = biaoColor)
    qa('.hot-list a').forEach(hot => {
      const focusColor = isDark ? '#a9a9a9' : '#626675'
      const hoverColor = isDark ? '#a9a9a9' : 'blue'
      const leaveColor = isDark ? 'white' : 'black'
      hot.style.color = textColor
      hot.addEventListener('focus', () => hot.style.color = focusColor)
      hot.addEventListener('mouseenter', () => hot.style.color = hoverColor)
      hot.addEventListener('mouseleave', () => {
        hot.style.color = document.activeElement === hot ? focusColor : leaveColor
      })
    })

    const aside = q('.aside')
    const fuzhucontent = q('.fuzhu-content')
    const dengluma = q('.denglu-ma')
    if (dengluma) dengluma.style.backgroundColor = navColor
    if (aside) {
      aside.style.backgroundColor = navColor
      aside.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.05)'
    }
    if (fuzhucontent) fuzhucontent.style.backgroundColor = navColor

    const fuzhutu = q('.fuzhu-tu')
    if (fuzhutu) {
      const borderDefault = isDark ? '1px solid #626675' : '1px solid #f9f8f8'
      const borderHover = `2px solid ${btnColor}`
      fuzhutu.style.border = borderDefault
      fuzhutu.addEventListener('mouseenter', () => {
        fuzhutu.style.border = borderHover
        fuzhutu.style.boxShadow = `0 0 0 15px ${navColor}, 0 4px 20px rgba(88,86,86,0.904)`
        fuzhutu.style.borderRadius = '50%'
      })
      fuzhutu.addEventListener('mouseleave', () => {
        fuzhutu.style.border = borderDefault
        fuzhutu.style.boxShadow = 'none'
        fuzhutu.style.borderRadius = 'none'
      })
    }

    const tu1 = q('.tu-1')
    if (tu1) {
      tu1.addEventListener('mouseenter', () => {
        tu1.style.boxShadow = `0 0 0 10px ${navColor}, 0 4px 20px rgba(88,86,86,0.904)`
        tu1.style.borderRadius = '50%'
      })
      tu1.addEventListener('mouseleave', () => {
        tu1.style.boxShadow = isDark ? '' : 'none'
        tu1.style.borderRadius = 'initial'
      })
    }

    const modalContent = q('.modal-content')
    const modalInputs = qa('.modal-content-right input')
    if (modalContent) modalContent.style.backgroundColor = navColor
    modalInputs.forEach(input => input.style.backgroundColor = bodyColor)

    const searchBorderBgcolor = q('.search-border-bgcolor')
    if (searchBorderBgcolor) searchBorderBgcolor.style.backgroundColor = navColor

    const border = q('.md-border')
    if (border) border.style.backgroundColor = borderColor

    const text = q('.text')
    if (text) text.style.backgroundColor = navColor

    const loginBtn = q('.denglu')
    if (loginBtn) loginBtn.style.backgroundColor = btnColor

    const searchIpt = q('.search')
    if (searchIpt) {
      if (isDark) searchIpt.style.color = 'white'
      searchIpt.style.borderColor = borderColor
      searchIpt.style.backgroundColor = bodyColor
      searchIpt.addEventListener('focus', () => {
        searchIpt.style.borderColor = isDark ? borderColor : '#4e6ef2'
      })
      searchIpt.addEventListener('blur', () => {
        searchIpt.style.borderColor = borderColor
      })
    }

    const searchBtn = q('.search-button')
    if (searchBtn) {
      searchBtn.style.backgroundColor = btnColor
      searchBtn.style.border = `2px solid ${btnColor}`
    }

    const closehistory = q('.close-history')
    const dropdownfooter = q('.dropdown-footer')
    if (dropdownfooter) dropdownfooter.style.backgroundColor = navColor
    if (closehistory) {
      closehistory.style.backgroundColor = navColor
      closehistory.addEventListener('mouseenter', () => {
        closehistory.style.color = isDark ? 'gray' : '#4e6ef2'
      })
    }

    const dropdown = q('.dropdown')
    if (dropdown) {
      dropdown.style.border = `2px solid ${isDark ? borderColor : '#4e6ef2'}`
      dropdown.style.borderTop = 'none'
      if (!isDark) dropdown.style.width = '542px'
    }

    qa('.dropdown-item').forEach(item => {
      item.style.backgroundColor = navColor
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = isDark ? btnColor : '#f0f0f0'
        item.style.color = isDark ? 'gray' : '#3385ff'
      })
      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = isDark ? navColor : '#fff'
        item.style.color = isDark ? 'gray' : 'black'
      })
    })
  })
  // emit 联动配色
  emits('update-colors', {
    navColor, bodyColor, textColor, btnColor, borderColor, downColor, ziColor, ziColor2
  })
}

// 配色切换映射
const colorHandlers: Record<string, () => void> = {
  '#00294a': () => applyColor('#00335c', '#00294a', '#e4e4e4', '#0061af', '#74bffa', '#0061af', '#003864', '#e4e4e4', '#a3a3a3'),
  '#4e2222': () => applyColor('#652c2c', '#4e2222', '#e4e4e4', '#833939', '#e7b3b3', '#833939', '#652c2c', '#e4e4e4', '#a3a3a3'),
  '#000000': () => applyColor('#000000', '#000000', '#e4e4e4', '#4c4c4c', '#e4e4e4', '#4c4c4c', '#000000', '#e4e4e4', '#a3a3a3'),
  '#1b6f1b': () => applyColor('#249424', '#1b6f1b', '#e4e4e4', '#279e27', '#aeffae', '#279e27', '#228d22', '#e4e4e4', '#a3a3a3'),
  '#fff': () => applyColor('#fff', '#fff', '#333', '#4e6ef2', '#ccc', '#f60', '#f5f5f6', '#222', 'red')
}

// 切换配色
function changeColor() {
  currentIndex.value = (currentIndex.value + 1) % bgColors.length
  const color = bgColors[currentIndex.value]
  colorHandlers[color]()
}

function onExitFuzhu() {
  colorHandlers['#fff']();
  emits('update-colors', {
    navColor: '#fff',
    bodyColor: '#fff',
    textColor: '#333',
    btnColor: '#4e6ef2',
    borderColor: '#ccc',
    downColor: '#f5f5f6',
    ziColor: '#222',
    ziColor2: 'red'
  });
  showFuzhuMode.value = false;
  emits('close');
}
</script>



<style scoped>
    /*||辅助模式弹窗*/

/* 显示弹窗时的样式 */
.fuzhu-div.show {
  display: flex;
  top: 0;  /* 弹窗滑入到页面顶部 */
  height: 100px;
  width: 100%;
  z-index: 9999; 
}
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

/* 图片的大小 */
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
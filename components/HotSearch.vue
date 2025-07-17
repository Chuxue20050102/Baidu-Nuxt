<template>
    <div
class="resou-container"     
    :style="{
      transform: showFuzhuMode ? 'translateY(100px)' : 'none',
      transition: 'transform 0.4s'
    }">
      <div class="resou-title-all">
        <a href="https://top.baidu.com/board?platform=pc&sa=pcindex_entry" target="_blank" class="resou-title1">百度热搜
          <span class="resou-title2">&gt;</span>
        </a>
        <span class="resou-change" @click="changeHotSearch">&#10227; 换一换</span>
      </div>
      <div class="hot-list">
        <div class="hot-left">
          <ul>
            <li
              v-for="(item, index) in currentHotList.slice(0, 5)" 
              :key="item.url" 
              :data-index="selectedIndex === 0 && index === 0 ? '↑' : selectedIndex * 10 + index" 
              :style="{ color: getColor(selectedIndex === 0 && index === 0 ? '↑' : selectedIndex * 10 + index) }"
            >
              <a class="biaozhu" :href="item.url" target="_blank"  :class="{ resouClicked: item.visited }" @click="markAsVisited(item)">{{ item.title }}</a>
              <span v-if="item.biao" class="biao">{{ item.biao }}</span>
            </li>
          </ul>
        </div>
        <div class="hot-right">
          <ul>
            <li 
              v-for="(item, index) in currentHotList.slice(5, 10)" 
              :key="item.url" 
              :data-index="selectedIndex * 10 + 5 + index" 
              :style="{ color: getColor(selectedIndex * 10 + 5 + index)  }"
            >
              <a class="biaozhu" :href="item.url" target="_blank"  :class="{ resouClicked: item.visited }" @click="markAsVisited(item)">{{ item.title }}</a>
              <span v-if="item.biao" class="biao">{{ item.biao }}</span>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useFuzhuMode } from '../composables/useFuzhuMode'
import { getColor } from '~/utils/color'

const showFuzhuMode = useFuzhuMode()

const selectedIndex = ref(0);
const hotLists = ref([
[
          { title: "我们簇拥在总书记身边", url: "https://www.baidu.com/s?wd=%E6%88%91%E4%BB%AC%E7%B0%87%E6%8B%A5%E5%9C%A8%E6%80%BB%E4%B9%A6%E8%AE%B0%E8%BA%AB%E8%BE%B9&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1" },
          { title: "李嘉诚卖港口 香港两任特首都发声了", url: "https://www.baidu.com/s?wd=%E6%9D%8E%E5%98%89%E8%AF%9A%E5%8D%96%E6%B8%AF%E5%8F%A3+%E9%A6%99%E6%B8%AF%E4%B8%A4%E4%BB%BB%E7%89%B9%E9%A6%96%E9%83%BD%E5%8F%91%E5%A3%B0%E4%BA%86&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1", biao: "沸" },
          { title: "海底捞顾客拒与同桌人平分赔偿金", url: "https://www.baidu.com/s?wd=%E6%B5%B7%E5%BA%95%E6%8D%9E%E9%A1%BE%E5%AE%A2%E6%8B%92%E4%B8%8E%E5%90%8C%E6%A1%8C%E4%BA%BA%E5%B9%B3%E5%88%86%E8%B5%94%E5%81%BF%E9%87%91&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1", biao: "沸" },
          { title: "让钱包鼓起来、消费旺起来", url: "https://www.baidu.com/s?wd=%E8%AE%A9%E9%92%B1%E5%8C%85%E9%BC%93%E8%B5%B7%E6%9D%A5%E3%80%81%E6%B6%88%E8%B4%B9%E6%97%BA%E8%B5%B7%E6%9D%A5&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1" },
          { title: "“今年春招 就业形势有何变化", url: "https://www.baidu.com/s?wd=%E4%BB%8A%E5%B9%B4%E6%98%A5%E6%8B%9B+%E5%B0%B1%E4%B8%9A%E5%BD%A2%E5%8A%BF%E6%9C%89%E4%BD%95%E5%8F%98%E5%8C%96&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1" },
          { title: "华莱士涉事门店态度嚣张无歉意", url: "https://www.baidu.com/s?wd=%E5%8D%8E%E8%8E%B1%E5%A3%AB%E6%B6%89%E4%BA%8B%E9%97%A8%E5%BA%97%E6%80%81%E5%BA%A6%E5%9A%A3%E5%BC%A0%E6%97%A0%E6%AD%89%E6%84%8F&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1", biao: "沸" },
          { title: "女子取170万装修房子银行立马报警", url: "https://www.baidu.com/s?wd=%E5%A5%B3%E5%AD%90%E5%8F%96170%E4%B8%87%E8%A3%85%E4%BF%AE%E6%88%BF%E5%AD%90%E9%93%B6%E8%A1%8C%E7%AB%8B%E9%A9%AC%E6%8A%A5%E8%AD%A6&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1", biao: "沸" },
          { title: "女子诈骗2400万打赏男主播1500万", url: "https://www.baidu.com/s?wd=%E5%A5%B3%E5%AD%90%E8%AF%88%E9%AA%972400%E4%B8%87%E6%89%93%E8%B5%8F%E7%94%B7%E4%B8%BB%E6%92%AD1500%E4%B8%87&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1" },
          { title: "美2名宇航员286天加班费1148美元", url: "https://www.baidu.com/s?wd=%E7%BE%8E2%E5%90%8D%E5%AE%87%E8%88%AA%E5%91%98286%E5%A4%A9%E5%8A%A0%E7%8F%AD%E8%B4%B91148%E7%BE%8E%E5%85%83&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1", biao: "沸" },
          { title: "普京嘲讽G7:地图上都看不到他们", url: "https://www.baidu.com/s?wd=%E6%99%AE%E4%BA%AC%E5%98%B2%E8%AE%BDG7%EF%BC%9A%E5%9C%B0%E5%9B%BE%E4%B8%8A%E9%83%BD%E7%9C%8B%E4%B8%8D%E5%88%B0%E4%BB%96%E4%BB%AC&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1" },
      ],
      [
          { "title": "ChatGPT热潮下，中国AI何去何从", "url": "https://www.baidu.com/s?wd=ChatGPT%E7%83%AD%E6%BD%AE%E4%B8%8B%EF%BC%8C%E4%B8%AD%E5%9B%AIAI%E4%BD%95%E5%8E%BB%E4%BD%95%E4%BB%8E&sa=fyb_n_homepage" },
          { "title": "探访中国最美樱花胜地", "url": "https://www.baidu.com/s?wd=%E6%8E%A2%E8%AE%BF%E4%B8%AD%E5%9B%BD%E6%9C%80%E7%BE%8E%E6%A8%B1%E8%8A%B1%E8%83%9C%E5%9C%B0&sa=fyb_n_homepage" },
          { "title": "90后夫妻花百万复原古宅被赞绝美", "url": "https://www.baidu.com/s?wd=90%E5%90%8E%E5%A4%AB%E5%A6%BB%E8%8A%B1%E7%99%BE%E4%B8%87%E5%A4%8D%E5%8E%9F%E5%8F%A4%E5%AE%85%E8%A2%AB%E8%B5%9E%E7%BB%9D%E7%BE%8E&sa=fyb_n_homepage", "biao": "热" },
          { "title": "中年人如何面对人生的第二次转型", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E5%B9%B4%E4%BA%BA%E5%A6%82%E4%BD%95%E9%9D%A2%E5%AF%B9%E4%BA%BA%E7%94%9F%E7%9A%84%E7%AC%AC%E4%BA%8C%E6%AC%A1%E8%BD%AC%E5%9E%8B&sa=fyb_n_homepage" },
          { "title": "粤港澳大湾区迎来新一轮政策红利", "url": "https://www.baidu.com/s?wd=%E7%B2%A4%E6%B8%AF%E6%BE%B3%E5%A4%A7%E6%B9%BE%E5%8C%BA%E8%BF%8E%E6%9D%A5%E6%96%B0%E4%B8%80%E8%BD%AE%E6%94%BF%E7%AD%96%E7%BA%A2%E5%88%A9&sa=fyb_n_homepage" },
          { "title": "上海外滩两只猫咪刷爆网络", "url": "https://www.baidu.com/s?wd=%E4%B8%8A%E6%B5%B7%E5%A4%96%E6%BB%A9%E4%B8%A4%E5%8F%AA%E7%8C%AB%E5%92%AA%E5%88%B7%E7%88%86%E7%BD%91%E7%BB%9C&sa=fyb_n_homepage", "biao": "热" },
          { "title": "大学毕业生平均薪资大曝光", "url": "https://www.baidu.com/s?wd=%E5%A4%A7%E5%AD%A6%E6%AF%95%E4%B8%9A%E7%94%9F%E5%B9%B3%E5%9D%87%E8%96%AA%E8%B5%84%E5%A4%A7%E6%9B%9D%E5%85%89&sa=fyb_n_homepage" },
          { "title": "男子徒步300公里为流浪狗找到家", "url": "https://www.baidu.com/s?wd=%E7%94%B7%E5%AD%90%E5%BE%92%E6%AD%A5300%E5%85%AC%E9%87%8C%E4%B8%BA%E6%B5%81%E6%B5%AA%E7%8B%97%E6%89%BE%E5%88%B0%E5%AE%B6&sa=fyb_n_homepage", "biao": "热" },
          { "title": "全球变暖对农业的深远影响", "url": "https://www.baidu.com/s?wd=%E5%85%A8%E7%90%83%E5%8F%98%E6%9A%96%E5%AF%B9%E5%86%9C%E4%B8%9A%E7%9A%84%E6%B7%B1%E8%BF%9C%E5%BD%B1%E5%93%8D&sa=fyb_n_homepage" },
          { "title": "未来十年，你准备好了吗？", "url": "https://www.baidu.com/s?wd=%E6%9C%AA%E6%9D%A5%E5%8D%81%E5%B9%B4%EF%BC%8C%E4%BD%A0%E5%87%86%E5%A4%87%E5%A5%BD%E4%BA%86%E5%90%97%EF%BC%9F&sa=fyb_n_homepage" }
      ],
      [
          { "title": "中国空间站的科学实验取得新突破", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E5%9B%BD%E7%A9%BA%E9%97%B4%E7%AB%99%E7%9A%84%E7%A7%91%E5%AD%A6%E5%AE%9E%E9%AA%8C%E5%8F%96%E5%BE%97%E6%96%B0%E7%AA%81%E7%A0%B4&sa=fyb_n_homepage" },
          { "title": "90后农民工返乡创业种植多肉植物", "url": "https://www.baidu.com/s?wd=90%E5%90%8E%E5%86%9C%E6%B0%91%E5%B7%A5%E8%BF%94%E4%B9%A1%E5%88%9B%E4%B8%9A%E7%A7%8D%E6%A4%8D%E5%A4%9A%E8%82%89%E6%A4%8D%E7%89%A9&sa=fyb_n_homepage" },
          { "title": "全球首款量子计算商用芯片亮相", "url": "https://www.baidu.com/s?wd=%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E9%87%8F%E5%AD%90%E8%AE%A1%E7%AE%97%E5%95%86%E7%94%A8%E8%8A%AF%E7%89%87%E4%BA%AE%E7%9B%B8&sa=fyb_n_homepage" },
          { "title": "中美科学家联合研究基因编辑技术", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E7%BE%8E%E7%A7%91%E5%AD%A6%E5%AE%B6%E8%81%94%E5%90%88%E7%A0%94%E7%A9%B6%E5%9F%BA%E5%9B%A0%E7%BC%96%E8%BE%91%E6%8A%80%E6%9C%AF&sa=fyb_n_homepage" },
          { "title": "北京冬奥会场馆改造后迎来首批游客", "url": "https://www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E5%86%AC%E5%A5%A5%E4%BC%9A%E5%9C%BA%E9%A6%86%E6%94%B9%E9%80%A0%E5%90%8E%E8%BF%8E%E6%9D%A5%E9%A6%96%E6%89%B9%E6%B8%B8%E5%AE%A2&sa=fyb_n_homepage" },
          { "title": "海洋污染对珊瑚生态系统的影响", "url": "https://www.baidu.com/s?wd=%E6%B5%B7%E6%B4%8B%E6%B1%A1%E6%9F%93%E5%AF%B9%E7%8F%8A%E7%91%9A%E7%94%9F%E6%80%81%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%BD%B1%E5%93%8D&sa=fyb_n_homepage" },
          { "title": "智能穿戴设备的未来发展趋势", "url": "https://www.baidu.com/s?wd=%E6%99%BA%E8%83%BD%E7%A9%BF%E6%88%B4%E8%AE%BE%E5%A4%87%E7%9A%84%E6%9C%AA%E6%9D%A5%E5%8F%91%E5%B1%95%E8%B6%8B%E5%8A%BF&sa=fyb_n_homepage" },
          { "title": "年轻一代的消费习惯正在改变", "url": "https://www.baidu.com/s?wd=%E5%B9%B4%E8%BD%BB%E4%B8%80%E4%BB%A3%E7%9A%84%E6%B6%88%E8%B4%B9%E4%B9%A0%E6%83%AF%E6%AD%A3%E5%9C%A8%E6%94%B9%E5%8F%98&sa=fyb_n_homepage" },
          { "title": "新型锂电池技术将重塑新能源行业", "url": "https://www.baidu.com/s?wd=%E6%96%B0%E5%9E%8B%E9%94%82%E7%94%B5%E6%B1%A0%E6%8A%80%E6%9C%AF%E5%B0%86%E9%87%8D%E5%A1%91%E6%96%B0%E8%83%BD%E6%BA%90%E8%A1%8C%E4%B8%9A&sa=fyb_n_homepage" },
          { "title": "电竞行业的全球化发展趋势", "url": "https://www.baidu.com/s?wd=%E7%94%B5%E7%AB%9E%E8%A1%8C%E4%B8%9A%E7%9A%84%E5%85%A8%E7%90%83%E5%8C%96%E5%8F%91%E5%B1%95%E8%B6%8B%E5%8A%BF&sa=fyb_n_homepage" }
      ],
      [
          { "title": "天宫空间站最新科研成果发布", "url": "https://www.baidu.com/s?wd=%E5%A4%A9%E5%AE%AB%E7%A9%BA%E9%97%B4%E7%AB%99%E6%9C%80%E6%96%B0%E7%A7%91%E7%A0%94%E6%88%90%E6%9E%9C%E5%8F%91%E5%B8%83&sa=fyb_n_homepage" },
          { "title": "非物质文化遗产传承人的奋斗故事", "url": "https://www.baidu.com/s?wd=%E9%9D%9E%E7%89%A9%E8%B4%A8%E6%96%87%E5%8C%96%E9%81%97%E4%BA%A7%E4%BC%A0%E6%89%BF%E4%BA%BA%E7%9A%84%E5%A5%8B%E6%96%97%E6%95%85%E4%BA%8B&sa=fyb_n_homepage" },
          { "title": "研究发现海洋塑料污染惊人程度", "url": "https://www.baidu.com/s?wd=%E7%A0%94%E7%A9%B6%E5%8F%91%E7%8E%B0%E6%B5%B7%E6%B4%8B%E5%A1%91%E6%96%99%E6%B1%A1%E6%9F%93%E6%83%8A%E4%BA%BA%E7%A8%8B%E5%BA%A6&sa=fyb_n_homepage" },
          { "title": "高考政策再度优化，学生如何应对？", "url": "https://www.baidu.com/s?wd=%E9%AB%98%E8%80%83%E6%94%BF%E7%AD%96%E5%86%8D%E5%BA%A6%E4%BC%98%E5%8C%96%EF%BC%8C%E5%AD%A6%E7%94%9F%E5%A6%82%E4%BD%95%E5%BA%94%E5%AF%B9%EF%BC%9F&sa=fyb_n_homepage" },
          { "title": "全国各地赏花路线推荐", "url": "https://www.baidu.com/s?wd=%E5%85%A8%E5%9B%BD%E5%90%84%E5%9C%B0%E8%B5%8F%E8%8A%B1%E8%B7%AF%E7%BA%BF%E6%8E%A8%E8%8D%90&sa=fyb_n_homepage", "biao": "热" },
          { "title": "AI芯片国产化加速，哪些公司受益？", "url": "https://www.baidu.com/s?wd=AI%E8%8A%AF%E7%89%87%E5%9B%BD%E4%BA%A7%E5%8C%96%E5%8A%A0%E9%80%9F%EF%BC%8C%E5%93%AA%E4%BA%9B%E5%85%AC%E5%8F%B8%E5%8F%97%E7%9B%8A%EF%BC%9F&sa=fyb_n_homepage" },
          { "title": "中国民营火箭领域再传捷报", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E5%9B%BD%E6%B0%91%E8%90%A5%E7%81%AB%E7%AE%AD%E9%A2%86%E5%9F%9F%E5%86%8D%E4%BC%A0%E6%8D%B7%E6%8A%A5&sa=fyb_n_homepage" },
          { "title": "大学生为养老院设计智能辅具", "url": "https://www.baidu.com/s?wd=%E5%A4%A7%E5%AD%A6%E7%94%9F%E4%B8%BA%E5%85%BB%E8%80%81%E9%99%A2%E8%AE%BE%E8%AE%A1%E6%99%BA%E8%83%BD%E8%BE%85%E5%85%B7&sa=fyb_n_homepage", "biao": "热" },
          { "title": "长江流域生态修复取得阶段成果", "url": "https://www.baidu.com/s?wd=%E9%95%BF%E6%B1%9F%E6%B5%81%E5%9F%9F%E7%94%9F%E6%80%81%E4%BF%AE%E5%A4%8D%E5%8F%96%E5%BE%97%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C&sa=fyb_n_homepage" },
          { "title": "90后爸爸自制木工玩具火出圈", "url": "https://www.baidu.com/s?wd=90%E5%90%8E%E7%88%B8%E7%88%B8%E8%87%AA%E5%88%B6%E6%9C%A8%E5%B7%A5%E7%8E%A9%E5%85%B7%E7%81%AB%E5%87%BA%E5%9C%88&sa=fyb_n_homepage" }
      ],
      [
          { "title": "中国电动车销量全球第一，背后原因揭秘", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E5%9B%BD%E7%94%B5%E5%8A%A8%E8%BD%A6%E9%94%80%E9%87%8F%E5%85%A8%E7%90%83%E7%AC%AC%E4%B8%80%EF%BC%8C%E8%83%8C%E5%90%8E%E5%8E%9F%E5%9B%A0%E6%8F%AD%E7%A7%98&sa=fyb_n_homepage" },
          { "title": "太空旅游进入平民时代，费用逐渐亲民", "url": "https://www.baidu.com/s?wd=%E5%A4%AA%E7%A9%BA%E6%97%85%E6%B8%B8%E8%BF%9B%E5%85%A5%E5%B9%B3%E6%B0%91%E6%97%B6%E4%BB%A3%EF%BC%8C%E8%B4%B9%E7%94%A8%E9%80%90%E6%B8%90%E4%BA%B2%E6%B0%91&sa=fyb_n_homepage" },
          { "title": "中国高校人工智能专业排名出炉", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E5%9B%BD%E9%AB%98%E6%A0%A1%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E4%B8%93%E4%B8%9A%E6%8E%92%E5%90%8D%E5%87%BA%E7%82%89&sa=fyb_n_homepage" },
          { "title": "研究发现常运动可延缓大脑衰老", "url": "https://www.baidu.com/s?wd=%E7%A0%94%E7%A9%B6%E5%8F%91%E7%8E%B0%E5%B8%B8%E8%BF%90%E5%8A%A8%E5%8F%AF%E5%BB%B6%E7%BC%93%E5%A4%A7%E8%84%91%E8%A1%B0%E8%80%81&sa=fyb_n_homepage", "biao": "热" },
          { "title": "中国成全球最大清洁能源投资国", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E5%9B%BD%E6%88%90%E5%85%A8%E7%90%83%E6%9C%80%E5%A4%A7%E6%B8%85%E6%B4%81%E8%83%BD%E6%BA%90%E6%8A%95%E8%B5%84%E5%9B%BD&sa=fyb_n_homepage" },
          { "title": "智能机器人助力农业生产再创新高", "url": "https://www.baidu.com/s?wd=%E6%99%BA%E8%83%BD%E6%9C%BA%E5%99%A8%E4%BA%BA%E5%8A%A9%E5%8A%9B%E5%86%9C%E4%B8%9A%E7%94%9F%E4%BA%A7%E5%86%8D%E5%88%9B%E6%96%B0%E9%AB%98&sa=fyb_n_homepage" },
          { "title": "年轻人热衷DIY电子产品的新趋势", "url": "https://www.baidu.com/s?wd=%E5%B9%B4%E8%BD%BB%E4%BA%BA%E7%83%AD%E8%A1%B7DIY%E7%94%B5%E5%AD%90%E4%BA%A7%E5%93%81%E7%9A%84%E6%96%B0%E8%B6%8B%E5%8A%BF&sa=fyb_n_homepage" },
          { "title": "中国电影再次入围奥斯卡最佳国际影片", "url": "https://www.baidu.com/s?wd=%E4%B8%AD%E5%9B%BD%E7%94%B5%E5%BD%B1%E5%86%8D%E6%AC%A1%E5%85%A5%E5%9B%B4%E5%A5%A5%E6%96%AF%E5%8D%A1%E6%9C%80%E4%BD%B3%E5%9B%BD%E9%99%85%E5%BD%B1%E7%89%87&sa=fyb_n_homepage", "biao": "热" },
          { "title": "世界知名大学发布最新全球排名", "url": "https://www.baidu.com/s?wd=%E4%B8%96%E7%95%8C%E7%9F%A5%E5%90%8D%E5%A4%A7%E5%AD%A6%E5%8F%91%E5%B8%83%E6%9C%80%E6%96%B0%E5%85%A8%E7%90%83%E6%8E%92%E5%90%8D&sa=fyb_n_homepage" },
          { "title": "气候变化如何影响未来城市的面貌", "url": "https://www.baidu.com/s?wd=%E6%B0%94%E5%80%99%E5%8F%98%E5%8C%96%E5%A6%82%E4%BD%95%E5%BD%B1%E5%93%8D%E6%9C%AA%E6%9D%A5%E5%9F%8E%E5%B8%82%E7%9A%84%E9%9D%A2%E8%B2%8C&sa=fyb_n_homepage" }
      ]
]);

const currentHotList = computed(() => hotLists.value[selectedIndex.value] || []);

function changeHotSearch() {
  selectedIndex.value = (selectedIndex.value + 1) % hotLists.value.length;
}
// function getColor(index) {
//   switch (index) {
//     case '↑':
//       return '#f63051';
//     case 1:
//       return '#fe2d46';
//     case 2:
//       return '#f60';
//     case 3:
//       return '#faa90e';
//     default:
//       return '#9195a3';
//   }
// }
function markAsVisited(item) {
  item.visited = true;
}
</script>
<style scoped>
.Baidu-logo {
  text-align: center;
  padding: 0;
  margin: 0 0 10px 0px;
}
.logo {
  width: 17em;
}
.resou-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 675px;
  margin: 45px auto;
  font-family: Arial, sans-serif;
}
.resou-title-all {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333;
}
.resou-title1 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  margin-left: 8px;
}
.resou-change {
  color: #626675;
  text-decoration: none;
  cursor: pointer;
}
.resou-change:hover {
  color: #3385ff;
}
.resou-title1:hover {
  color: #3385ff;
  text-decoration: none;
}
.hot-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.hot-left, .hot-right {
  width: 48%;
}
.hot-list ul {
  list-style: none;
  padding-left: 0;
}
.hot-list li {
  position: relative;
  padding-left: 7px;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hot-list a {
  display: inline-block;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.biaozhu {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  max-width: calc(100% - 60px);
}
.biaozhu:hover {
  text-decoration: underline;
  color: #3385ff;
}
.biaozhu.resouClicked{
  color:#626675;
}
.resouClicked:hover{
  color:#226acc;
  text-decoration: underline;
}
.biao {
  background-color: #f60;
  color: white;
  margin-left: 6px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px;
  font-size: 12px;
  border-radius: 4px;
}
.hot-list li::before {
  content: attr(data-index);
  font-size: 1.15em;
  margin-right: 12px;
  position: relative;
  text-decoration: none;
}
li[data-index]::before {
  top: 3px;
}
</style> 
<template>
  <div
:style="{
      transform: showFuzhuMode ? 'translateY(100px)' : 'none',
      transition: 'transform 0.4s'
    }">
      <div class="Baidu-logo">
        <NuxtImg src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="Baidu Logo" class="logo"/>
      </div>
      <!-- 搜索框及历史记录下拉内容 -->
      <div class="search-container" tabindex="0"  @click.stop>    
        <input       
            ref="searchInput"       
            v-model="searchQuery" 
            type="text" 
            :class="{'search': true, 'search-2': isHistoryVisible}"
            @input="filterHistory"
            @click="showHistory" 
            @keydown.enter="search" 
            @blur="hideHistory"
        >
        <div v-show="isHistoryVisible" class="search-border-bgcolor"/>
        <div v-show="isHistoryVisible" class="md-border"/>
        <div v-show="isHistoryVisible" class="dropdown"  @mousedown.prevent>      
            <div         
              v-for="(item, index) in filteredHistory.slice(0, 10)" 
              :key="item" 
              class="dropdown-item" 
              tabindex="0"
              @click="selectHistory(item)"
            >        
            {{ item }}      
            </div> 
            <div class="dropdown-footer">
                <button class="close-history" @click="clearHistory">关闭历史</button>
            </div>
        </div>  
        <button class="search-button" @click="search">百度一下</button>  
      </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { useFuzhuMode } from '../composables/useFuzhuMode'

const showFuzhuMode = useFuzhuMode()

const searchQuery = ref('');
const history = ref([]);
const isHistoryVisible = ref(false);
const filteredHistory = ref([]);

onMounted(() => {
  if (typeof window !== 'undefined') {
    history.value = JSON.parse(localStorage.getItem('searchHistory')) || [];
  }
});

function showHistory() {
  isHistoryVisible.value = true;
  filteredHistory.value = history.value.filter(item =>
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
}
function hideHistory() {
  setTimeout(() => {
    isHistoryVisible.value = false;
  }, 1);
}
function filterHistory() {
  filteredHistory.value = history.value.filter(item =>
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
}
function selectHistory(item) {
  searchQuery.value = item;
  search();
}
function search() {
  const query = searchQuery.value.trim();
  if (query) {
    const index = history.value.indexOf(query);
    if (index !== -1) {
      history.value.splice(index, 1);
    }
    history.value.unshift(query);
    history.value = history.value.slice(0, 10);
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchHistory', JSON.stringify(history.value));
    }
    window.location.href = 'https://www.baidu.com/s?wd=' + encodeURIComponent(query);
    searchQuery.value = "";
  }
}
function clearHistory() {
  history.value = [];
  if (typeof window !== 'undefined') {
    localStorage.setItem('searchHistory', JSON.stringify(history.value));
  }
  filteredHistory.value = [];
  isHistoryVisible.value = false;
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
.search-container {
  display: flex;
  width: 110%;
  max-width: 650px;
  margin: 0 auto;
  position: relative;
}
.search {
  flex-grow: 1;
  padding: 15px;
  border: 0.15em solid #ccc;
  border-radius: 10px 0px 0px 10px;
  border-right: 0;
  box-sizing: border-box;
  padding-right: 20px;
  outline: none;
  height: 45px;
}
.search-2{
  border-bottom: none;
  border-radius: 10px 0px 0px  !important;
}
.search-button {
  padding: 10px 20px;
  background-color: #4e6ef2;
  color: white;
  border: 2px solid #4e6ef2;
  border-left: none;
  border-radius: 0px 10px 10px 0px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
}
.button:hover {
  background-color: #4e6ef2;
}
.search-container:focus-within .search {
  border-color: #4e6ef2;
}
.search:focus {
  border-color: #4e6ef2;
  border-radius: 10px 0px 0px 10px;
}
.dropdown {
  color: #585858;
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  max-height: auto;
  width: 543px;
  border: 2px solid #4e6ef2;
  border-radius: 0px 0px 10px 10px;
  overflow-y: auto;
  z-index: 3;
  border-top: none;
}
.search-border-bgcolor{
    position: absolute;
    top:80%;
    left:2px;
    background-color:white;
    width: 540px;
    height: 15px;
    z-index: 1;
}
.md-border{
    width: 506px;
    position:absolute;
    top:43px;
    left:18px;
    z-index:3;
    background-color:#dedddd;
    height: 1px;
}
.dropdown-item {
  padding: 5px;
  padding-left: 15px;
  cursor: pointer;
  background-color: white;
  font-size: 14px;
  color: gray;
}
.dropdown-item:hover {
  background-color: #f0f0f0;
  color: #3385ff;
}
.dropdown-footer {
  text-align: right;
  z-index: 4;
  background-color: white;
}
.close-history {
  background-color: white;
  color: #9195a3;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}
.close-history:hover{
  background-color: white;
  color:#226acc
}
</style> 
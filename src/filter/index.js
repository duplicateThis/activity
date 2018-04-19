import Vue from 'vue'
import {CodeToText} from 'element-china-area-data'

// time filter
Vue.filter('timeFilter',function(date){
  var d = new Date(date);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  return year+ '/' + month + '/' + day
})

// address filter
Vue.filter('addressFilter', function(addr){
  if(addr != '暂无') {
    let arr = '';
    let len = addr.length - 1;
    for(let i = 0; i < len; i ++) {
      arr += CodeToText[addr[i]]
    }
    arr += addr[len]
    return arr
  }
})

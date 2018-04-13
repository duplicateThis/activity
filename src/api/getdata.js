import fetch from '@/fetch.js'

// 新建活动
export const create = data => fetch('/activity/create', data, 'POST');

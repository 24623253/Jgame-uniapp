// 时间适配
export function formatTime(time) {
  const d = new Date(time);
  const now = Date.now();
  const diff = (now - d) / 1000;
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else {
    return Math.ceil(diff / (3600 * 24)) + '天前'
  }
}

// 时间格式
export function parseTime(time, isSymbol) {
  const date = new Date(time || new Date());
  const y = date.getFullYear();
  const m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  const h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
  const min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  const s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
  if (!isSymbol) return y + '年' + m + '月' + d + '日';
  return y + '-' + m + '-' + d
}


// 去除 HTML 代码与空格
export function excludeHTMLLabel(content) {
  let html = content;
  html = html.replace(/^\s+|\s+$/g, '');
  html = html.replace(/[ ]/g, '');
  html = html.replace(/<[^>]+>/g, '');
  html = html.replace(/&nbsp;/g, '');
  return html;
}

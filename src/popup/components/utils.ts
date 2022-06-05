export function getWeekDate() {
  var now = new Date();
  var day = now.getDay();
  var weeks = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  var week = weeks[day];
  return week;
}

export function getProgressValue(current: string, total: string) {
  return Number(((~~current / ~~total) * 100).toFixed(0));
}

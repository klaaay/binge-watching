import dayjs from 'dayjs';

export function getWeekDate() {
  var now = new Date();
  var day = now.getDay();
  var weeks = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  var week = weeks[day];
  return week;
}

export const DAY_MINUTES = 24 * 60;

export function getDiffDay(updateWeek, time: Date) {
  const diff = Number(updateWeek) - time.getDay();
  return diff < 0 ? diff + 7 : diff;
}

function formatMinutes(minutes: number) {
  const day = Number(Math.floor(minutes / DAY_MINUTES));
  const hour = day > 0 ? Math.floor((minutes - day * DAY_MINUTES) / 60) : Math.floor(minutes / 60);
  const minute = day > 0 || hour > 0 ? Math.floor(minutes - day * DAY_MINUTES - hour * 60) : minutes;
  let time = '';
  if (day > 0) time += day + '天';
  if (hour > 0) time += hour + '小时';
  if (minute > 0) time += minute + '分钟';
  return time;
}

export function getOneDayDiffTime(time: string) {
  const [hours, minutes] = time.split(':').map(item => Number(item));
  const [dayHours, dayMinutes] = dayjs()
    .format('HH:mm')
    .split(':')
    .map(item => Number(item));
  const diffMinutes = hours * 60 + minutes - (dayHours * 60 + dayMinutes);
  return diffMinutes;
}

export function getDiffMinutes(diffDay: number, updateAt: string) {
  return diffDay * DAY_MINUTES + getOneDayDiffTime(updateAt);
}

export function getDiffDHM(diffDay: number, updateAt: string) {
  return formatMinutes(getDiffMinutes(diffDay, updateAt));
}

export function getProgressValue(current: string, total: string) {
  return Number(((~~current / ~~total) * 100).toFixed(0));
}

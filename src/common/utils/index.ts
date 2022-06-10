import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { set, cloneDeep } from 'lodash-es';
import { WEIGHT_1, WEIGHT_2, WEIGHT_3 } from 'common/constants';
import { Binge, FilterItem } from 'common/types';

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
  if (minutes <= 0) return '已更新';
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

export const getBingeSortFuc = (time: Date) => (a: Binge, b: Binge) => {
  // 完结第一权重、观看进度第二权重、更新时间第三权重
  let aProgress = getProgressValue(a.current, a.total) * WEIGHT_2;
  let bProgress = getProgressValue(b.current, b.total) * WEIGHT_2;
  const aDiffMinutes = getDiffMinutes(getDiffDay(a.updateWeek, time), a.updateAt) * WEIGHT_3;
  const bDiffMinutes = getDiffMinutes(getDiffDay(b.updateWeek, time), b.updateAt) * WEIGHT_3;
  if (a.isEnd) {
    aProgress = aProgress + WEIGHT_1;
  }
  if (b.isEnd) {
    bProgress = bProgress + WEIGHT_1;
  }
  return aProgress + aDiffMinutes - (bProgress + bDiffMinutes);
};

export const modifySpecificBing = (
  originalBinges: Binge[],
  {
    id,
    key,
    value,
  }: {
    id: string;
    key: string;
    value: string | boolean;
  }
) => {
  let _binges = cloneDeep(originalBinges);
  const index = originalBinges.findIndex(item => item.id === id);
  set(_binges, `${index}.${key}`, value);
  chrome.storage.local.set({
    binges: _binges,
  });
  toast.success('修改成功');
  return _binges;
};

export const removeSpecificBing = (
  originalBinges: Binge[],
  {
    id,
  }: {
    id: string;
  }
) => {
  let _binges = cloneDeep(originalBinges);
  const index = originalBinges.findIndex(item => item.id === id);
  _binges.splice(index, 1);
  chrome.storage.local.set({
    binges: _binges,
  });
  toast.success('删除成功');
  return _binges;
};

export function addCurrentCountBing(
  originalBinges: Binge[],
  {
    id,
    addCount = 1,
  }: {
    id: string;
    addCount?: number;
  }
) {
  let _binges = cloneDeep(originalBinges);
  const index = originalBinges.findIndex(item => item.id === id);
  set(_binges, `${index}.current`, String(Number(_binges[index].current) + 1));
  chrome.storage.local.set({
    binges: _binges,
  });
  return _binges;
}

export function setChromeFilterList(filterList: FilterItem[]) {
  chrome.storage.local.set({
    filters: filterList,
  });
}

export async function getHtmlText(url: string) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    return body;
  } catch (error) {
    return '';
  }
}

export async function getCurrentUpdatedTotal(url: string, configTotal: string) {
  const htmlText = await getHtmlText(url);
  if (!htmlText) return configTotal;
  const updateIndex = htmlText.indexOf('更新至');
  const updateStr = htmlText.slice(updateIndex, updateIndex + 10);
  return Number((updateStr || '').match(/\d+/g)?.[0]);
}

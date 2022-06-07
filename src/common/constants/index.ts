import { isNumber } from 'lodash-es';

export enum Week {
  '周日' = 0,
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
}

export const weekList = Object.values(Week).filter(isNumber);

export const WEIGHT_1 = 1000000;
export const WEIGHT_2 = 1000;
export const WEIGHT_3 = 1;
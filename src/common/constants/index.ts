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

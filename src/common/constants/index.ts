import { FilterItem } from 'common/types';
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

export const WEIGHT_1 = 1000000000;
export const WEIGHT_2 = 100000;
export const WEIGHT_3 = 1;

export const filterOptions: (FilterItem & { label: string })[] = [
  {
    key: 'isEnd',
    value: true,
    label: '完结',
  },
  {
    key: 'isEnd',
    value: false,
    label: '未完结',
  },
];

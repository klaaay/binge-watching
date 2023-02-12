export type Binge = {
  id: string;
  title: string;
  url: string;
  current: string;
  total: string;
  post: string;
  updateAt: string;
  updateWeek: string;
  isEnd?: boolean;
  doubanLink?: string;
  bangumiLink?: string;
};

export type FilterItem = {
  key: keyof Binge;
  value: Binge[keyof Binge];
};

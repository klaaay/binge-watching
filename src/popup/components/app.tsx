import { useEffect, useState } from 'react';
import { PageWrapper, Title, Link, Icon, Input } from 'common/components/styles';
import { getBingeSortFuc, getWeekDate, setChromeFilterList } from 'common/utils';
import { Binge, FilterItem } from 'common/types';
import { BingesList, PopupFilters, PopupNav } from './styles';
import BingeItem from './BingeItem';
import { filterOptions } from 'common/constants';
import { cloneDeep } from 'lodash';

function App() {
  const [binges, setBinges] = useState<Binge[]>([]);
  const [time, setTime] = useState(new Date());
  const [filterList, setFilterList] = useState<FilterItem[]>([]);
  const [filterTitle, setFilterTitle] = useState('');

  useEffect(() => {
    chrome.storage.local.get('binges', function (data) {
      setBinges(data.binges as Binge[]);
    });
    chrome.storage.local.get('filters', function (data) {
      setFilterList((data?.filters ?? []) as FilterItem[]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const _filteredBinges = filterList?.length
    ? binges.filter(binge => filterList.some(filterItem => binge[filterItem.key] === filterItem.value))
    : binges;

  const filteredBinges = _filteredBinges.filter(binge => binge.title.includes(filterTitle));

  return (
    <PageWrapper>
      <PopupNav>
        <Title style={{ margin: 0 }}>
          追剧列表
          <Link
            style={{
              paddingLeft: 8,
              fontSize: '12px',
            }}
            target="_blank"
            href="/assets/html/options.html">
            管理
          </Link>
        </Title>
        <div className="time">{`${getWeekDate()} ${time.toLocaleTimeString()}`}</div>
      </PopupNav>
      <PopupFilters>
        <Input
          border="primary"
          placeholder="请输入名称搜索"
          style={{
            width: 190,
            height: 22,
          }}
          onChange={e => {
            setFilterTitle(e.target.value);
          }}
        />
        {filterOptions.map(({ key, value, label }) => {
          const isInFilter = filterList.find(item => item.key === key && item.value === value);
          const isInFilterIndex = filterList.findIndex(item => item.key === key && item.value === value);
          return (
            <Icon
              onClick={() => {
                let _filterList = cloneDeep(filterList);
                if (isInFilter) {
                  _filterList.splice(isInFilterIndex, 1);
                } else {
                  _filterList.push({
                    key,
                    value,
                  });
                }
                setFilterList(_filterList);
                setChromeFilterList(_filterList);
              }}
              type={isInFilter ? 'primary' : 'default'}
              key={label}>
              {label}
            </Icon>
          );
        })}
      </PopupFilters>
      <BingesList>
        {filteredBinges?.sort(getBingeSortFuc(time)).map(binge => {
          return <BingeItem key={binge.id} {...binge} time={time} binges={binges} setBinges={setBinges} />;
        })}
      </BingesList>
    </PageWrapper>
  );
}

export default App;

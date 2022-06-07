import { useEffect, useState } from 'react';
import { PageWrapper, Title, Link } from 'common/components/styles';
import { getBingeSortFuc, getWeekDate } from 'common/utils';
import { Binge } from 'common/types';
import { BingesList, PopupNav } from './styles';
import BingeItem from './BingeItem';

function App() {
  const [binges, setBinges] = useState<Binge[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    chrome.storage.local.get('binges', function (data) {
      setBinges(data.binges as Binge[]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
      <BingesList>
        {binges?.sort(getBingeSortFuc(time)).map(binge => {
          return <BingeItem {...binge} time={time} />;
        })}
      </BingesList>
    </PageWrapper>
  );
}

export default App;

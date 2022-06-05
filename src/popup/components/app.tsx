import React, { useEffect, useState } from 'react';
import { PageWrapper, Title, Link, TipText } from 'common/components/styles';
import { Binge } from 'common/types';
import { BingesList, PopupNav } from './styles';
import { getProgressValue, getWeekDate } from './utils';

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
        {binges
          ?.sort((a, b) => getProgressValue(a.current, a.total) - getProgressValue(b.current, b.total))
          .map(({ id, title, url, current, total, post, updateAt }) => {
            const progressValue = getProgressValue(current, total);
            return (
              <div
                key={id}
                onClick={() => {
                  window.open(url);
                }}
                className="binge-item">
                <div className="post">
                  <img src={post} alt={title} />
                </div>
                <div className="content">
                  <div className="title">
                    {title}
                    <span className="episode">
                      {current} / {total}
                    </span>
                  </div>
                  <div>
                    <progress
                      title={String(progressValue)}
                      className="progress"
                      max="100"
                      value={progressValue}></progress>
                    <TipText style={{ paddingLeft: 4 }}>{progressValue}%</TipText>
                  </div>
                  <div className="update-time">{updateAt}</div>
                </div>
              </div>
            );
          })}
      </BingesList>
    </PageWrapper>
  );
}

export default App;

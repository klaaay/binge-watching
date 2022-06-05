import React, { useEffect, useState } from 'react';
import { PageWrapper, Title } from 'common/components/styles';
import { Binge } from 'common/types';
import { BingesList } from './styles';

function App() {
  const [binges, setBinges] = useState<Binge[]>([]);

  useEffect(() => {
    chrome.storage.local.get('binges', function (data) {
      setBinges(data.binges as Binge[]);
    });
  }, []);

  return (
    <PageWrapper>
      <Title style={{ margin: '0 12px', paddingBottom: 12 }}>追剧列表</Title>
      <BingesList>
        {binges?.map(({ id, title, url, current, total, post, updateAt }) => {
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

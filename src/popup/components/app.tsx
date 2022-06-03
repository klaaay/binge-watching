import React, { useEffect, useState } from 'react';
import { PageWrapper, Title } from 'common/components/styles';
import { Binge } from 'common/types';

function App() {
  const [binges, setBinges] = useState<Binge[]>([]);

  useEffect(() => {
    chrome.storage.local.get('binges', function (data) {
      setBinges(data.binges as Binge[]);
    });
  }, []);

  return (
    <PageWrapper>
      <Title>追剧列表</Title>
      <pre>{JSON.stringify(binges, null, 2)}</pre>
    </PageWrapper>
  );
}

export default App;

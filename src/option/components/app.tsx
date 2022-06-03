import React, { useState } from 'react';
import { Input, Flex, Button, Title } from 'common/components/styles';
import { Binge } from 'common/types';

function App() {
  const addBinge = ({ title = `test`, url = 'https://wwww.baidu.com', count = '10' }) => {
    chrome.storage.local.get('binges', function (data) {
      const _binges: Binge[] = (data.binges as Binge[]) || [];
      chrome.storage.local.set({
        binges: [..._binges, { title, url, count }],
      });
    });
  };

  return (
    <div id="app-root">
      <Title>剧集管理</Title>
      <div>
        <Flex alignCenter>
          <div>名称：</div>
          <Input />
        </Flex>
        <Flex alignCenter>
          <div>地址：</div>
          <Input />
        </Flex>
        <Flex alignCenter>
          <div>集数：</div>
          <Input />
        </Flex>
        <Flex alignCenter>
          <Button
            onClick={() => {
              addBinge({});
            }}>
            添加
          </Button>
          <Button
            onClick={() => {
              chrome.storage.local.remove(['binges'], () => {
                console.log('清空成功');
              });
            }}>
            清空
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default App;

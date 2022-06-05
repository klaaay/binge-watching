import React from 'react';
import { Button, Title } from 'common/components/styles';
import { ContentWrapper, NavHeader, PageWrapper } from './styles';
import { Toaster } from 'react-hot-toast';
import { OptionContainer, useOptionState } from './app.container';
import AddArea from './addArea';
import BingesList from './bingesList';

function App() {
  const { setBinges } = useOptionState();

  return (
    <PageWrapper id="app-root">
      <NavHeader>
        <Title>剧集管理</Title>
      </NavHeader>
      <ContentWrapper>
        <div className="sidebar-left">
          <div>
            <Button
              onClick={() => {
                if (window.confirm('确认清空?')) {
                  chrome.storage.local.remove(['binges']);
                  setBinges([]);
                }
              }}
              type="danger">
              清空所有
            </Button>
          </div>
        </div>
        <div className="content">
          <BingesList />
        </div>
        <div className="sidebar-right">
          <AddArea />
        </div>
      </ContentWrapper>
      <Toaster />
    </PageWrapper>
  );
}

function AppWrapper() {
  return (
    <OptionContainer.Provider>
      <App />
    </OptionContainer.Provider>
  );
}

export default AppWrapper;

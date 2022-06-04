import React, { useState, useEffect, useRef } from 'react';
import { uniqueId, debounce } from 'lodash-es';
import { useForm } from 'react-hook-form';
import { Input, Flex, Button, Title, SectionTitle } from 'common/components/styles';
import { Binge } from 'common/types';
import { ContentWrapper, NavHeader, PageWrapper, AddForm, ListItemWrapper, Label } from './styles';
import toastr from 'toastr';
import { modifySpecificBing, removeSpecificBing } from './helper';

const DEFAULT_POST = 'https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/movie.png';

function App() {
  const [binges, setBinges] = useState<Binge[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Binge>();
  const submitRef = useRef<HTMLInputElement>(null);

  const addBinge = ({ title, url, current, total, post }) => {
    chrome.storage.local.get('binges', function (data) {
      const _binges: Binge[] = [
        ...((data.binges as Binge[]) || []),
        { title, url, current, total, post: !!post ? post : DEFAULT_POST, id: `${title}_${uniqueId()}` },
      ];
      chrome.storage.local.set({
        binges: _binges,
      });
      setBinges(_binges);
      toastr.success('添加成功');
      reset({
        title: '',
        url: '',
        current: '',
        total: '',
        post: '',
      });
    });
  };

  useEffect(() => {
    chrome.storage.local.get('binges', function (data) {
      setBinges((data?.binges || []) as Binge[]);
    });
  }, []);

  const handleSpecificChange = (id: string, key: string, originalValue: string) =>
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const _binges = modifySpecificBing(binges, {
        id,
        key,
        value: e.target.value || originalValue,
      });
      setBinges(_binges);
    });

  return (
    <PageWrapper id="app-root">
      <NavHeader>
        <Title>剧集管理</Title>
      </NavHeader>
      <ContentWrapper>
        <div className="sidebar-left">
          <div style={{ marginBottom: 16 }}>
            <Button
              onClick={() => {
                chrome.storage.local.set({
                  binges,
                });
              }}
              type="primary">
              应用修改
            </Button>
          </div>
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
          {binges?.map(({ id, title, url, current, total, post }) => {
            return (
              <ListItemWrapper key={id}>
                <SectionTitle>{title}</SectionTitle>
                <Flex>
                  <Input defaultValue={title} onChange={handleSpecificChange(id, 'title', title)} />
                </Flex>
                <Flex>
                  <Input defaultValue={url} onChange={handleSpecificChange(id, 'url', url)} />
                </Flex>
                <Flex>
                  <Input defaultValue={current} onChange={handleSpecificChange(id, 'current', current)} />
                </Flex>
                <Flex>
                  <Input defaultValue={total} onChange={handleSpecificChange(id, 'total', total)} />
                </Flex>
                <Flex>
                  <Input defaultValue={post} onChange={handleSpecificChange(id, 'post', post)} />
                </Flex>
                <Flex>
                  <Button
                    onClick={() => {
                      const _binges = removeSpecificBing(binges, { id });
                      console.log('toastr', toastr);
                      toastr.success('删除成功');
                      setBinges(_binges);
                    }}
                    className="danger">
                    删除
                  </Button>
                </Flex>
              </ListItemWrapper>
            );
          })}
        </div>
        <div className="sidebar-right">
          <AddForm
            onSubmit={handleSubmit(data => {
              addBinge(data);
            })}>
            <Flex alignCenter>
              <Label>剧名：</Label>
              <Input placeholder="剧名" {...register('title', { required: true })} />
            </Flex>
            {errors.title && <p className="error">请输入剧名</p>}
            <Flex alignCenter>
              <Label>地址：</Label>
              <Input placeholder="看剧地址" {...register('url', { required: true })} />
            </Flex>
            {errors.url && <p className="error">请输入看剧地址</p>}
            <Flex alignCenter>
              <Label>看到：</Label>
              <Input placeholder="看到第几集" {...register('current')} />
            </Flex>
            <Flex alignCenter>
              <Label>一共：</Label>
              <Input placeholder="一共几集" {...register('total')} />
            </Flex>
            <Flex alignCenter>
              <Label>海报：</Label>
              <Input placeholder="剧的海报图地址" {...register('post')} />
            </Flex>
            <Flex alignCenter gap={8}>
              <input
                ref={submitRef}
                style={{
                  display: 'none',
                }}
                type="submit"
                title="添加"
              />
              <Button
                type="primary"
                onClick={() => {
                  submitRef.current.click();
                }}>
                添加
              </Button>
            </Flex>
          </AddForm>
        </div>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default App;

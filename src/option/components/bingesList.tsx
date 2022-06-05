import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash-es';
import { Button, Flex, Input, SectionTitle } from 'common/components/styles';
import { Week, weekList } from 'common/constants';
import { useOptionState } from './app.container';
import { Label, ListItemWrapper } from './styles';
import { modifySpecificBing, removeSpecificBing } from './helper';
import { Binge } from 'common/types';

const BingesList = () => {
  const [filterValue, setFilterValue] = useState('');

  const { binges, setBinges } = useOptionState();

  const handleSpecificChange = (id: string, key: string, originalValue: string) =>
    debounce((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const _binges = modifySpecificBing(binges, {
        id,
        key,
        value: e.target.value || originalValue,
      });
      setBinges(_binges);
    }, 300);

  const handleSwitchSpecificChange = (id: string, key: string) =>
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const _binges = modifySpecificBing(binges, {
        id,
        key,
        value: e.target.checked,
      });
      setBinges(_binges);
    }, 300);

  useEffect(() => {
    chrome.storage.local.get('binges', function (data) {
      setBinges((data?.binges || []) as Binge[]);
    });
  }, []);

  return (
    <>
      <Input
        style={{ width: '100%', height: '24px' }}
        onChange={e => {
          setFilterValue(e.target.value);
        }}
        placeholder="输入剧名筛选"></Input>
      {binges
        ?.filter(item => item.title?.includes(filterValue))
        .map(({ id, title, url, current, total, post, updateAt, updateWeek, isEnd = false }) => {
          return (
            <ListItemWrapper key={`${title}-${id}`}>
              <SectionTitle>{title}</SectionTitle>

              <Flex>
                <Label>剧名：</Label>
                <Input defaultValue={title} onChange={handleSpecificChange(id, 'title', title)} />
              </Flex>
              <Flex>
                <Label>地址：</Label>
                <Input defaultValue={url} onChange={handleSpecificChange(id, 'url', url)} />
              </Flex>
              <Flex>
                <Label>看到：</Label>
                <Input defaultValue={current} onChange={handleSpecificChange(id, 'current', current)} />
              </Flex>
              <Flex>
                <Label>一共：</Label>
                <Input defaultValue={total} onChange={handleSpecificChange(id, 'total', total)} />
              </Flex>
              <Flex>
                <Label>完结：</Label>
                <Input type="checkbox" defaultChecked={isEnd} onChange={handleSwitchSpecificChange(id, 'isEnd')} />
              </Flex>
              <Flex
                style={{
                  display: isEnd ? 'none' : 'flex',
                }}>
                <Label>更新：</Label>
                <select
                  defaultValue={updateWeek}
                  onChange={handleSpecificChange(id, 'updateWeek', updateWeek)}
                  style={{ marginRight: 4 }}>
                  {weekList.map(item => {
                    return (
                      <option key={item} value={item}>
                        {Week[item]}
                      </option>
                    );
                  })}
                </select>
                <Input defaultValue={updateAt} onChange={handleSpecificChange(id, 'updateAt', updateAt)} />
              </Flex>
              <Flex>
                <Label>海报：</Label>
                <Input defaultValue={post} onChange={handleSpecificChange(id, 'post', post)} />
              </Flex>
              <Flex>
                <Button
                  onClick={() => {
                    const _binges = removeSpecificBing(binges, { id });
                    setBinges(_binges);
                  }}
                  className="danger">
                  删除
                </Button>
              </Flex>
            </ListItemWrapper>
          );
        })}
    </>
  );
};

export default BingesList;

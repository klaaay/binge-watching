import React from 'react';
import { Button, Flex, Input } from 'common/components/styles';
import { Binge } from 'common/types';
import { Week, weekList } from 'common/constants';
import toast from 'react-hot-toast';
import { uniqueId } from 'lodash-es';
import { useOptionState } from './app.container';
import { AddForm, Label } from './styles';

const DEFAULT_POST = 'https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/movie.png';

const AddArea = () => {
  const { handleSubmit, register, setBinges, reset, errors, submitRef } = useOptionState();

  const addBinge = ({ title, url, current, total, post, updateAt, updateWeek, isEnd = false }) => {
    chrome.storage.local.get('binges', function (data) {
      console.log('isEnd', isEnd);
      const _binges: Binge[] = [
        ...((data.binges as Binge[]) || []),
        {
          title,
          url,
          current,
          total,
          updateAt,
          updateWeek,
          post: !!post ? post : DEFAULT_POST,
          isEnd,
          id: `${title}_${uniqueId()}`,
        },
      ];
      chrome.storage.local.set({
        binges: _binges,
      });
      setBinges(_binges);
      toast.success('添加成功');
      reset({
        title: '',
        url: '',
        current: '',
        total: '',
        post: '',
        isEnd: false,
      });
    });
  };

  return (
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
        <Label>更新：</Label>
        <select style={{ marginRight: 4 }} {...register('updateWeek')}>
          {weekList.map(item => {
            return <option value={item}>{Week[item]}</option>;
          })}
        </select>
        <Input placeholder="更新时间" {...register('updateAt')} />
      </Flex>
      <Flex alignCenter>
        <Label>海报：</Label>
        <Input placeholder="剧的海报图地址" {...register('post')} />
      </Flex>
      <Flex alignCenter>
        <Label>完结：</Label>
        <Input type="checkbox" {...register('isEnd')} />
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
  );
};

export default AddArea;

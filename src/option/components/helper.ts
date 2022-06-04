import { set, cloneDeep } from 'lodash-es';
import { Binge } from 'common/types';
import toast, { Toaster } from 'react-hot-toast';

export const modifySpecificBing = (
  originalBinges: Binge[],
  {
    id,
    key,
    value,
  }: {
    id: string;
    key: string;
    value: string;
  }
) => {
  let _binges = cloneDeep(originalBinges);
  const index = originalBinges.findIndex(item => item.id === id);
  set(_binges, `${index}.${key}`, value);
  chrome.storage.local.set({
    binges: _binges,
  });
  toast.success('修改成功');
  return _binges;
};

export const removeSpecificBing = (
  originalBinges: Binge[],
  {
    id,
  }: {
    id: string;
  }
) => {
  let _binges = cloneDeep(originalBinges);
  const index = originalBinges.findIndex(item => item.id === id);
  _binges.splice(index, 1);
  chrome.storage.local.set({
    binges: _binges,
  });
  toast.success('删除成功');
  return _binges;
};

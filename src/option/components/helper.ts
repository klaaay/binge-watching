import { set, cloneDeep } from 'lodash-es';
import { Binge } from 'common/types';

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

  return _binges;
};

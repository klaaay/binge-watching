import { Binge } from 'common/types';
import toast from 'react-hot-toast';

import { openFileDialog } from './openFileDialog';

export function outputJSON(data, filename) {
  if (!data) {
    alert('保存的数据为空');
    return;
  }
  if (!filename) filename = 'json.json';
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }
  var blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}

export function importJSON(cb?: (binges: Binge[]) => any) {
  openFileDialog({
    accept: 'text/json',
    multiple: false,
    callback: async (e: any) => {
      try {
        const file = e.target?.files[0];
        console.log(file.type);
        if (!file.type.includes('json')) return toast.error(`文件格式错误 ${file.type}`);
        const reader = new FileReader();
        reader.onload = function (e) {
          const content = e.target?.result as string;
          const _binges = JSON.parse(content);
          cb?.(_binges);
          chrome.storage.local.set({
            binges: _binges,
          });
        };
        reader.readAsText(file);
      } catch (error) {}
    },
  });
}

export function openFileDialog(options: {
  accept?: string;
  multiple?: boolean;
  callback: (arg: Event) => void;
  initializeWithCustomAttributes?: (arg: HTMLInputElement) => void;
}): void {
  const inputElement = document.createElement('input');
  inputElement.type = 'file';

  const { accept, multiple, callback, initializeWithCustomAttributes } = Object.assign(
    {
      accept: '*',
      multiple: false,
    },
    options
  );

  if (accept !== '*') inputElement.accept = accept;
  inputElement.multiple = multiple;

  inputElement.addEventListener('change', arg => {
    callback(arg);
  });

  if (initializeWithCustomAttributes) {
    initializeWithCustomAttributes(inputElement);
  }
  inputElement.dispatchEvent(new MouseEvent('click'));
}

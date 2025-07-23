import type { MaskState } from './../types/mask';

export default function(mask: string, input: HTMLInputElement) {
  const value = input.value;
  const state: MaskState = {
    maskedValue: '',
    unmaskedValue: '',
  };

  let valueIndex = 0;
  let maskIndex = 0;

  while (true) {
    const valueChar = value[valueIndex];
    const maskChar = mask[maskIndex];

    if (valueChar === undefined || maskChar === undefined) {
      break;
    } else if (maskChar === 'M') {
      if (/\d/.test(valueChar)) {
        if (mask[maskIndex - 1] !== 'M' && !['0', '1'].includes(valueChar)) {
          break;
        }

        state.unmaskedValue += valueChar;
        state.maskedValue += valueChar;

        valueIndex++;
        maskIndex++;
      } else {
        break;
      }
    } else if (maskChar === '0' || maskChar === 'Y') {
      if (/\d/.test(valueChar)) {
        state.unmaskedValue += valueChar;
        state.maskedValue += valueChar;

        valueIndex++;
        maskIndex++;
      } else {
        break;
      }
    } else if (maskChar === valueChar) {
      state.maskedValue += maskChar;

      valueIndex++;
      maskIndex++;
    } else {
      state.maskedValue += maskChar;

      maskIndex++;
    }
  }

  input.value = state.maskedValue;

  return state;
}

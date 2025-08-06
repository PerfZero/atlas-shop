declare module 'react-imask' {
  import { ComponentType, InputHTMLAttributes } from 'react';

  interface IMaskInputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string | RegExp | Array<string | RegExp>;
    unmask?: boolean;
    onAccept?: (value: string) => void;
    onComplete?: (value: string) => void;
    lazy?: boolean;
    placeholderChar?: string;
    definitions?: { [key: string]: RegExp };
    blocks?: { [key: string]: unknown };
    pattern?: string;
    format?: (value: string) => string;
    parse?: (value: string) => string;
    autofix?: boolean;
    radix?: string;
    mapToRadix?: string[];
    scale?: number;
    signed?: boolean;
    thousandsSeparator?: string;
    padFractionalZeros?: boolean;
    normalizeZeros?: boolean;
    min?: number;
    max?: number;
    dispatch?: (appended: string, dynamicMasked: unknown) => string;
    overwrite?: boolean | 'shift' | boolean;
    eager?: boolean | 'remove' | 'append' | boolean;
    skipInvalid?: boolean;
    showMask?: boolean;
    maskRef?: (mask: unknown) => void;
    inputRef?: (input: HTMLInputElement) => void;
  }

  export const IMaskInput: ComponentType<IMaskInputProps>;
} 
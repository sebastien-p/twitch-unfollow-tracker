import toast, { Options, HideToastFunction } from 'cogo-toast';
import i18next from 'i18next';

import { i18n } from '../i18n';

export function showToast(
  type: 'loading',
  position?: Options['position']
): Promise<HideToastFunction>;

export function showToast(
  type: keyof typeof toast,
  position?: Options['position']
): Promise<void>;

export async function showToast(
  type: keyof typeof toast,
  position: Options['position'] = 'bottom-center'
): Promise<HideToastFunction | void> {
  const t: i18next.TFunction = await i18n;

  return await toast[type](t(type), {
    hideAfter: type === 'loading' ? 0 : undefined,
    bar: { size: '0' },
    position
  });
}

export function withToasts<
  T extends (...args: any[]) => Promise<U> | U,
  U = any
>(callback: T) {
  return async (...args: Parameters<T>): Promise<U> => {
    const hide: HideToastFunction = await showToast('loading', 'top-center');

    try {
      const value: U = await callback(...args);
      showToast('success');
      return value;
    }
    catch (error) {
      showToast('error');
      throw error;
    }
    finally {
      hide();
    }
  };
}

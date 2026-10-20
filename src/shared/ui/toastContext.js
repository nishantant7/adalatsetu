import { createContext, useContext } from 'react';

export const ToastContext = createContext(() => {});

/** Returns `showToast(message, tone?)`, where tone is 'success' (default) or 'error'. */
export function useToast() {
  return useContext(ToastContext);
}

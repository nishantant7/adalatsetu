import { useCallback, useRef, useState } from 'react';
import Icon from './Icon';
import { ToastContext } from './toastContext';
import './Toast.css';

/** Shows short messages at the bottom of the screen; components call `useToast()`. */
export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const showToast = useCallback((message, tone = 'success') => {
    clearTimeout(timer.current);
    setToast({ message, tone, key: Date.now() });
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div key={toast.key} className={`toast toast--${toast.tone}`}>
            <Icon name={toast.tone === 'error' ? 'alert' : 'check'} size={16} />
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

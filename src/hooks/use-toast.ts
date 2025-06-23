
import { useState } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactElement;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (toast: Omit<Toast, 'id'>) => {
    const newToast = {
      ...toast,
      id: Math.random().toString(36).substring(7)
    };
    setToasts(prev => [...prev, newToast]);
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3000);
  };

  return { toast, toasts };
};

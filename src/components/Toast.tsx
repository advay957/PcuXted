import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderColor = 'border-ted-red';
        let iconColor = 'text-ted-red';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderColor = 'border-rose-500';
          iconColor = 'text-rose-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderColor = 'border-blue-500';
          iconColor = 'text-blue-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-[#141418]/95 backdrop-blur-xl border ${borderColor} text-white shadow-2xl animate-fade-in`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
            <p className="text-xs sm:text-sm text-zinc-200 flex-1 leading-snug">
              {toast.message}
            </p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-md text-zinc-400 hover:text-white"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

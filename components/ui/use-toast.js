// components/ui/use-toast.js
// このファイルはshadcn/uiのToastコンポーネントの一部です
// 実際のプロジェクトでは、shadcn/uiのToastコンポーネントをインストールして使用します

import { createContext, useContext, useState } from "react";

const ToastContext = createContext({
  toast: () => {},
  dismissToast: () => {},
  toasts: []
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant = "default" }) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    
    // 3秒後に自動的に消える
    setTimeout(() => {
      dismissToast(id);
    }, 3000);
    
    return id;
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast, toasts }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-md shadow-md ${
                t.variant === "destructive" ? "bg-red-100 text-red-900" : "bg-white"
              }`}
            >
              {t.title && <div className="font-medium">{t.title}</div>}
              {t.description && <div className="text-sm">{t.description}</div>}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

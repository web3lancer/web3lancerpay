// define use-toast component

import React from 'react';
import { useState, createContext, ReactNode } from 'react';

// Define the ToastOptions interface
interface ToastOptions {
    id: string;
    message: string;
    duration?: number;
}


const ToastContext = createContext<{
    toast: (options: ToastOptions) => void;
    close: (id: string) => void;
}>({
    toast: () => {},
    close: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastOptions[]>([]);

    const toast = (options: ToastOptions) => {
        const id = new Date().getTime().toString();
        setToasts((prev) => [...prev, { ...options, id }]);
    };

    const close = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast, close }}>
            {children}
        </ToastContext.Provider>
    );
};

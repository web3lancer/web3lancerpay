// define use-toast component

import React from 'react';
import { useState, useContext, createContext, ReactNode } from 'react';
import { ToastActionElement, ToastClose, ToastDescription, ToastTitle, ToastViewport } from './toast';
import { cn } from '@/lib/utils';


const ToastContext = createContext({
    toast: (options: ToastOptions) => void;
    close: (id: string) => void;
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

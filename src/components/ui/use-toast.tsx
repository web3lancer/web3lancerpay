// define use-toast component

import React from 'react';
import { useState, createContext, ReactNode } from 'react';
import { buttonVariants } from "@/components/ui/button";

// Define the ToastOptions interface
interface ToastOptions {
    id: string;
    message: string;
    title?: string;
    description?: string;
    duration?: number;
    variant?: keyof typeof buttonVariants; // Add 'variant' to ToastOptions
}


const ToastContext = createContext<{
    toast: (options: ToastOptions) => void;
    close: (id: string) => void;
}>({
    toast: () => {},
    close: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [, setToasts] = useState<ToastOptions[]>([]);

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

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
export const Toast = ({ message, duration = 3000 }: ToastOptions) => {
    const { close } = useToast();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            close(message);
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, close]);

    return (
        <div className="toast">
            {message}
            <button onClick={() => close(message)}>Close</button>
        </div>
    );
}
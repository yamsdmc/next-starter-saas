import React from 'react';
import toast, { Toaster as HotToaster, ToastOptions } from "react-hot-toast";

export const ToasterWrapper: React.FC = () => (
    <HotToaster
        position="top-right"
        reverseOrder={false}
    />
);

const defaultOptions: ToastOptions = {
    duration: 3000,
    position: 'top-right',
};

export const showToast = {
    success: (message: string, options?: ToastOptions) =>
        toast.success(message, { ...defaultOptions, ...options }),

    error: (message: string, options?: ToastOptions) =>
        toast.error(message, { ...defaultOptions, ...options }),

    loading: (message: string, options?: ToastOptions) =>
        toast.loading(message, { ...defaultOptions, ...options }),
};
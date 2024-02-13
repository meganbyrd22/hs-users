import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
}
 

const Toast: React.FC<ToastProps> = ({message, onClose, duration = 1000}: ToastProps) => {
    useEffect(() => {
        const timeout = setTimeout(() =>{
            onClose();
        }, duration);
        return () => clearTimeout(timeout);
    }, [onClose, duration])

    return (
        <div className= "fixed inset-0 flex justify-center  items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-3xl">{message}</div>
                <button className="mt-4 bg-gray-400 border border-gray-500 px-2 py-2 rounded-lg" onClick={onClose}>X</button>
            </div>
        </div>
    )
}

export default Toast;

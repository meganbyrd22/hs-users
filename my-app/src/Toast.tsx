import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
}
 

const Toast: React.FC<ToastProps> = ({message, onClose}: ToastProps) => {
    useEffect(() => {
        const timeout = setTimeout(() =>{
            onClose();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [onClose])

    return (
        <div>
            <div>{message}</div>
            <button className="bg-gray-400" onClick={onClose}>X</button>
        </div>
    )
}

export default Toast;
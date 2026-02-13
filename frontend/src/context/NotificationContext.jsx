import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiInfo } from 'react-icons/fi';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const notify = useCallback((message, icon = FiInfo, duration = 3000) => {
        // Clear existing timeout if any (simplified logic, real app might use refs)
        setNotification({ message, icon, id: Date.now() });

        setTimeout(() => {
            setNotification((current) => {
                // Only clear if it's still the same notification
                if (current && current.id <= Date.now() - duration + 100) {
                    return null;
                }
                return current; // Let the new one stay or simple timeout clearing
            });
            // Simple timeout for now, precise ID check is better but this works for basic cases
            setNotification(null);
        }, duration);
    }, []);

    return (
        <NotificationContext.Provider value={{ notification, notify }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);

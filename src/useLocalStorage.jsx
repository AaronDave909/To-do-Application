import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsedItem = JSON.parse(item);
                return parsedItem.map(item => ({
                    ...item,
                    completionDate: item.completionDate ? new Date(item.completionDate) : null,
                    completedAt: item.completedAt ? new Date(item.completedAt) : null,
                }));
            }
            return initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const valueToStore = storedValue.map(item => ({
                ...item,
                completionDate: item.completionDate ? item.completionDate.toISOString() : null,
                completedAt: item.completedAt ? item.completedAt.toISOString() : null,
            }));
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;

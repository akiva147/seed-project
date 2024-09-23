import { useCallback, useState, useEffect } from 'react';

export function useLocalStorage(key: string, defaultValue: string | null) {
    return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key: string, defaultValue: string | null) {
    return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(
    key: string,
    defaultValue: string | null,
    storageObject: Storage
) {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return jsonValue;

        return defaultValue;
    });

    useEffect(() => {
        if (value === null) return storageObject.removeItem(key);
        storageObject.setItem(key, value);
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(null);
    }, []);

    return [value, setValue, remove] as const;
}

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useApi(url, options = {}, autoFetch = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);
    // uso el hook  useCallbak por el warning React Fast Refresh y para no tener renderizados innecesarios
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios(url, options);
            setData(response.data);
        } catch (err) {
            setError(err.message || 'Error al cargar datos');
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [url]);

    const create = useCallback(async (newData) => {
        try {
            const response = await axios.post(url, newData);
            return response.data;
        } catch (err) {
            throw err;
        }
    }, [url]);

    const update = useCallback(async (id, updatedData) => {
        try {
            const response = await axios.put(`${url}/${id}`, updatedData);
            return response.data;
        } catch (err) {
            throw err;
        }
    }, [url]);

    const remove = useCallback(async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
            return true;
        } catch (err) {
            throw err;
        }
    }, [url]);

    return { data, loading, error, refetch: fetchData, create, update, remove };
}
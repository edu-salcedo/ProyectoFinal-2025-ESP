import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApi(url, options = {}, autoFetch = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);

    const fetchData = async () => {
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
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [url]);

    const create = async (newData) => {
        try {
            const response = await axios.post(url, newData);
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    const update = async (id, updatedData) => {
        try {
            const response = await axios.put(`${url}/${id}`, updatedData);
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    const remove = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
            return true;
        } catch (err) {
            throw err;
        }
    };

    return { data, loading, error, refetch: fetchData, create, update, remove };
}
import { useState, useEffect } from "react";

export function useFetch<T>(url: string, token?: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const json = (await res.json()) as T;

                if (!cancelled) {
                    setData(json);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                }
            }

            if (!cancelled) {
                setLoading(false);
            }
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [url, token]);

    return { data, loading, error };
}
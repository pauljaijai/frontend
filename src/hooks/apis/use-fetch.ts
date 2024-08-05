import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

type FetchFunction<T> = () => T | Promise<T>;

export function useFetch<T>(dataFunction: FetchFunction<T>): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = dataFunction();

        if (result instanceof Promise) {
          const data = await result;
          setData(data);
        } else {
          setData(result);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dataFunction]);

  return { data, isLoading, error };
}

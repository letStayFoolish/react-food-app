import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url: string, config: RequestInit) => {
  const response = await fetch(url, config);

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || "Something went wrong, failed to send request.",
    );
  }

  return responseData;
};

export function useHttp<T>(url: string, config: RequestInit) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function clearData() {
    setData(undefined);
  }

  const sendHttp = useCallback(
    async function sendHttp(requestBody?: BodyInit) {
      setIsLoading(true);

      try {
        const resData: T = await sendHttpRequest(url, {
          ...config,
          body: requestBody,
        });

        setData(resData);
      } catch (error: any) {
        setError(error.message || "Something went wrong.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [url, config],
  );

  useEffect(() => {
    // sendHttp();
    if (config && (config?.method === "GET" || !config?.method)) {
      sendHttp();
    }
  }, [sendHttp, config]);

  return { data, isLoading, error, sendHttp, clearData };
}

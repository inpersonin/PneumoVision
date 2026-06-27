import { useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/predict";

export function useInference() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (file) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const detail = payload?.detail;
        const message = Array.isArray(detail)
          ? detail.map((item) => item.msg || item).join(", ")
          : detail;
        throw new Error(message || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err.message || "Failed to connect to the inference server. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { predict, result, isLoading, error, reset };
}

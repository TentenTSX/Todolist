class ApiFetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const ApiFetch = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL ?? "";
    const response = await fetch(`${apiUrl}${endpoint}`, {
      credentials: "include",
      ...options,
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      throw new ApiFetchError(
        errorBody?.message ?? `Erreur HTTP ${response.status}`,
        response.status,
      );
    }
    if (response.status === 204) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { ApiFetchError };
export default ApiFetch;

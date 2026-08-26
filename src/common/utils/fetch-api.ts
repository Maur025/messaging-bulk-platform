import { toast } from "@/components/ui/toast";
import { environments } from "../config/env";
import type { APIResponse } from "../interfaces/api-response";

interface Request {
  resource: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, any> | null;
}

export const fetchApi = async <T>({ resource, method, headers = {}, body }: Request) => {
  const defaultHeaders = { "content-type": "application/json" };

  const init: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  const response = await doFetch(resource, init);

  if (!response) {
    return;
  }

  if (!response.ok) {
    console.error("Error fetching data:", response?.statusText);
    toast.add({
      title: "Error del servidor",
      type: "error",
    });
    return;
  }

  return (await response.json()) as APIResponse<T>;
};

const doFetch = async (resource: string, init: RequestInit): Promise<Response | undefined> => {
  try {
    return await fetch(`${environments.API_URL}/${resource}`, init);
  } catch (error) {
    console.error("fetch error: ", error);

    toast.add({
      title: "Error conectando con el servidor",
      type: "error",
      timeout: 5000,
    });
  }
};

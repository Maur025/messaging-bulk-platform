import { environments } from "../../config/env";
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

  const response = await fetch(`${environments.API_URL}/${resource}`, init);

  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }

  return (await response.json()) as APIResponse<T>;
};

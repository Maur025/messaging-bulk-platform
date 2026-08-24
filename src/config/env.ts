const { VITE_API_URL = "http://localhost:3000" } = import.meta.env;

export interface Environments {
  API_URL: string;
}

export const environments: Environments = {
  API_URL: VITE_API_URL,
} as const;

import createKyInstance from "./instance";
import { DEFAULT_CONFIG } from "./config";
import type { ApiConfig, APIResponse, ApiRequestOptions } from "./types";

let instance = createKyInstance();
let currentConfig: ApiConfig = DEFAULT_CONFIG;

export const configureApi = (config: Partial<ApiConfig> = {}) => {
  currentConfig = {
    ...currentConfig,
    ...config,
    headers: {
      ...currentConfig.headers,
      ...config.headers,
    },
  };
  instance = createKyInstance(currentConfig);
};

export const setAuthToken = (token?: string) => {
  if (!currentConfig.enableAuth) {
    console.warn(
      "Auth is not enabled. Enable it by calling configureApi with enableAuth: true",
    );
    return;
  }

  configureApi({
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};

export const api = {
  get: async <T>(
    url: string,
    options?: ApiRequestOptions,
  ): Promise<APIResponse<T>> => {
    const cleanUrl = url.replace(/^\//, "");
    return instance
      .get(cleanUrl, {
        signal: options?.signal,
        timeout: options?.timeout,
      })
      .json<APIResponse<T>>();
  },

  post: async <T>(
    url: string,
    data?: unknown,
    options?: ApiRequestOptions,
  ): Promise<APIResponse<T>> => {
    const cleanUrl = url.replace(/^\//, "");
    return instance
      .post(cleanUrl, {
        json: data,
        signal: options?.signal,
        timeout: options?.timeout,
      })
      .json<APIResponse<T>>();
  },

  put: async <T>(
    url: string,
    data?: unknown,
    options?: ApiRequestOptions,
  ): Promise<APIResponse<T>> => {
    const cleanUrl = url.replace(/^\//, "");
    return instance
      .put(cleanUrl, {
        json: data,
        signal: options?.signal,
        timeout: options?.timeout,
      })
      .json<APIResponse<T>>();
  },

  delete: async <T>(
    url: string,
    options?: ApiRequestOptions,
  ): Promise<APIResponse<T>> => {
    const cleanUrl = url.replace(/^\//, "");
    return instance
      .delete(cleanUrl, {
        signal: options?.signal,
        timeout: options?.timeout,
      })
      .json<APIResponse<T>>();
  },
};

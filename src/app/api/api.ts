import axios, { AxiosRequestConfig } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: baseUrl,
  headers,
});

export const http = {
  get: async (url: string, options: AxiosRequestConfig = {}) => {
    const response = await instance(`${url}`, options);
    return response.data;
  },
  post: async (url: string, data: any, options: AxiosRequestConfig = {}) => {
    const response = await instance(`${url}`, {
      method: "POST",
      data,
      ...options,
    });
    return response.data;
  },
  put: async (url: string, data: any, options: AxiosRequestConfig = {}) => {
    const response = await instance(`${url}`, {
      method: "PUT",
      data,
      ...options,
    });
    return response.data;
  },
  delete: async (url: string, options: AxiosRequestConfig = {}) => {
    const response = await instance(`${url}`, {
      method: "DELETE",
      ...options,
    });
    return response.data;
  },
  patch: async (url: string, data: any, options: AxiosRequestConfig = {}) => {
    const response = await instance(`${url}`, {
      method: "PATCH",
      data,
      ...options,
    });
    return response.data;
  },
};

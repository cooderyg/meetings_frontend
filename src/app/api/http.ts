import Axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const axios = Axios.create({
  baseURL: baseUrl,
  headers,
});




export const http = {
  get: function httpGet<Response = unknown>(url: string) {
    return axios.get<Response>(url).then(res => res.data);
  },
  post: function httpPost<Request, Response = unknown>(url: string, data?: Request) {
    return axios.post<Response>(url, data).then(res => res.data);
    
  },
  delete: function httpDelete<Request, Response = unknown>(url: string, data?: Request) {
    return axios.delete<Response>(url, { data }).then(res => res.data);
  },
  put: function httpPut<Request, Response = unknown>(url: string, data?: Request) {
    return axios.put<Response>(url, data).then(res => res.data);
  },
  patch: function httpPatch<Request, Response = unknown>(url: string, data?: Request) {
    return axios.patch<Response>(url, data).then(res => res.data);
  },
};

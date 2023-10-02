import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiEndpoints, BASEURL } from "../configs/apiConfig";

interface ICreateAxiosRequest {
  method: AxiosRequestConfig["method"],
  url: ApiEndpoints,
  signal?: AbortSignal,
  params?: number,
  data?: {},
}

export async function createAxiosRequest<T>(options: ICreateAxiosRequest): Promise<AxiosResponse<T>> {
  const { method, url, data, params, signal} = options;

  const config: AxiosRequestConfig = {
    baseURL: BASEURL,
    method,
    url: `/${url}`,
    signal,
  };

  if (params) {
    config.url += `/${params}`
  }

  if (data) {
    config.data = data;
  }

  return await axios<T>(config)
}
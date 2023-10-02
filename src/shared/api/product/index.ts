import { ApiEndpoints, ApiMethods } from "@/shared/configs/apiConfig";
import { createAxiosRequest } from "@/shared/utils/requestUtils";
import { ICreateProduct, IProduct } from "./types/types";

export async function getProducts(signal?: AbortSignal): Promise<IProduct[]> {
  const response = await createAxiosRequest<IProduct[]>({
    method: ApiMethods.GET,
    url: ApiEndpoints.PRODUCT,
    signal
  })
  return response.data
}

export async function getProduct(id: number, signal?: AbortSignal): Promise<IProduct> {
  const response = await createAxiosRequest<IProduct>({
    method: ApiMethods.GET,
    url: ApiEndpoints.PRODUCT,
    params: id,
    signal
  })
  return response.data
}

export async function updateProduct({id, data}: {id: IProduct['id'], data: Partial<ICreateProduct>}): Promise<IProduct> {
  const response = await createAxiosRequest<IProduct>({
    method: ApiMethods.PUT,
    url: ApiEndpoints.PRODUCT,
    params: id,
    data: data,
  })
  return response.data
}

export async function createProduct(data: Partial<ICreateProduct>): Promise<IProduct> {
  const response = await createAxiosRequest<IProduct>({
    method: ApiMethods.POST,
    url: ApiEndpoints.PRODUCT,
    data
  })
  return response.data
}

export async function deleteProduct(id: IProduct['id']): Promise<IProduct> {
    const response = await createAxiosRequest<IProduct>({
      method: ApiMethods.DELETE,
      url: ApiEndpoints.PRODUCT,
      params: id,
    })
    return response.data
}
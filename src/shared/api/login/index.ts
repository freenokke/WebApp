import { ApiEndpoints, ApiMethods } from "@/shared/configs/apiConfig"
import { createAxiosRequest } from "@/shared/utils/requestUtils"
import { ZLoginData, ZLoginResponse } from "./types/types"


export async function login(data: ZLoginData): Promise<ZLoginResponse> {
  const response = await createAxiosRequest<ZLoginResponse>({
    method: ApiMethods.POST,
    url: ApiEndpoints.LOGIN,
    data: data
  })
  return response.data
}
export const BASEURL = process.env.NEXT_PUBLIC_BACKEND_URL ?? '';

export enum ApiEndpoints {
  PRODUCT = 'products',
  LOGIN= 'auth/login'
}

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
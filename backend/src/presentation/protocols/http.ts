export interface HttpError {
  error_code: string
  error_description: string
}

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export interface HttpRequest {
  body?: any
}

export interface HttpResponse<T> {
  code: number;
  body: T | string;
}

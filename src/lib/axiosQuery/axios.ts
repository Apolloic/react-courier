import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export type MultipleBaseUrlType = Record<string, string>;
export type BaseUrlType = string | MultipleBaseUrlType;

export interface ConstructorArgsType<BaseUrl> {
  baseUrl?: BaseUrl;
  timeout?: number;
  publicHeaders?: Record<string, string>;
}

export interface RequestConfigType<D = any, Q = any>
  extends AxiosRequestConfig {
  data?: D;
  queryParams?: Q;
}

class AxiosQuery<BaseUrl extends BaseUrlType = BaseUrlType> {
  public baseUrl?: BaseUrl;
  private agent: AxiosInstance;

  constructor({
    baseUrl,
    timeout,
    publicHeaders,
  }: ConstructorArgsType<BaseUrl>) {
    this.baseUrl = baseUrl;
    this.agent = axios.create({
      baseURL: typeof baseUrl === "string" ? baseUrl : undefined,
      headers: {
        "Content-Type": "application/json",
        ...publicHeaders,
      },
      timeout: (timeout || 5) * 1000,
    });
  }

  async request<
    ResponseType = any,
    QueryParamsType = any,
    RequestDataType = any
  >(
    url: string,
    configs?: RequestConfigType<RequestDataType, QueryParamsType>
  ) {
    let response: AxiosResponse<ResponseType>;
    switch (configs?.method) {
      case "POST":
        response = await this.agent.post(url, configs.data);
        break;
      case "DELETE":
        response = await this.agent.delete(url);
        break;
      case "PATCH":
        response = await this.agent.patch(url, configs.data);
        break;
      case "PUT":
        response = await this.agent.put(url, configs.data);
        break;
      case "GET":
      default:
        response = await this.agent.get(url, {
          params: configs?.queryParams,
        });
        break;
    }

    const finalData: ResponseType = response.data;
    return finalData;
  }
}

export default AxiosQuery;

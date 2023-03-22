import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from "axios";
import {defaultDto} from "./hookCreatorUtils";

export type MultipleBaseUrlType = Record<string, string>;
export type BaseUrlType = string | MultipleBaseUrlType;

export interface ConstructorArgsType<BaseUrl> {
  baseUrl?: BaseUrl;
  timeout: number;
  options?: {
    hasDefaultDto?: boolean;
    exteraDto?: (data: any) => any;
  };
  publicHeaders?: Record<string, string>;
}

export interface RequestConfigType<D = any, Q = any> extends AxiosRequestConfig {
  data?: D;
  queryParams?: Q;
}

class AxiosQuery<BaseUrl extends BaseUrlType = BaseUrlType> {
  public baseUrl?: BaseUrl;
  private agent: AxiosInstance;
  public options: ConstructorArgsType<BaseUrl>["options"];
  constructor({baseUrl, timeout, publicHeaders, options}: ConstructorArgsType<BaseUrl>) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.agent = axios.create({
      baseURL: typeof baseUrl === "string" ? baseUrl : undefined,
      headers: {
        "Content-Type": "application/json",
        ...publicHeaders,
      },
      timeout: 1000,
    });
  }

  async request<ResponseType = any, QueryParamsType = any, RequestDataType = any>(
    url: string,
    configs?: RequestConfigType<RequestDataType, QueryParamsType>
  ) {
    try {
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
      const finalData: ResponseType = this.options?.hasDefaultDto
        ? this.options.exteraDto
          ? this.options.exteraDto(defaultDto(response.data as ResponseType))
          : defaultDto(response.data as ResponseType)
        : this.options?.exteraDto
        ? this.options?.exteraDto(response.data as ResponseType)
        : (response.data as ResponseType);
      return finalData;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AxiosQuery;

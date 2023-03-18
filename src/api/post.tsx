import { createAxiosQueryHook } from "../lib/axiosQuery/hookCreator";
import { AxiosQueryTypeHelper } from "../lib/axiosQuery/hookCreatorType";

type UsePostType = AxiosQueryTypeHelper<{
  endPointArgs: {
    postId: number;
  };
  responseData: {
    id: number;
    first_name: string;
    last_name: string;
  }[];
  responseDataAfterDto: {
    firstName: string,
    lastName: string,
    id: number,
  }[],
  dynamicQueryParams: {
    age: number;
  };
}>;

export const useGetAllPost = createAxiosQueryHook<UsePostType>({
  endPoint: () => "/posts",
  name: ({ age, postId }) => ["post", age, postId],
  method: "GET",
  baseUrl: "default",
  options: {
    applyDefaultDto: true
  },
  dto: (data) => {
    return data
  }
});
import {camelCase, isArray} from "lodash";
import {createAxiosQueryHook} from "../lib/axiosQuery/hookCreator";
import {AxiosQueryTypeHelper} from "../lib/axiosQuery/hookCreatorType";

type UsePostType = AxiosQueryTypeHelper<{
  endPointArgs: {
    postId: number;
  };
  responseData: {
    body: string;
    id: number;
    title: string;
    userId: number;
  };
  dynamicQueryParams: {
    age: number;
  };
}>;

export const useGetAllPost = createAxiosQueryHook<UsePostType>({
  endPoint: () => "/posts",
  name: ({age, postId}) => ["post", age, postId],
  method: "GET",
  baseUrl: "default",
  options: {
    applyDefaultDto: true,
  },
});

const arrayData = [
  {
    first_name: "Erfan",
  },
  {
    lasy_name: "Erfan",
  },
  {
    full_name: "Erfan",
  },
];

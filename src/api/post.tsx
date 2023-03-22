import {createAxiosQueryHook} from "../lib/axiosQuery/hookCreator";
import {AQHookTypeHelper} from "../lib/axiosQuery/hookCreatorType";
import {toast} from "react-toastify";
// Query or Mutation
type UsePostType = AQHookTypeHelper<{
  method: "GET";
  endPointArgs: {
    postId: number;
  };
  responseData: {
    id: number;
    first_name: string;
    last_name: string;
  }[];
  dynamicQueryParams: {
    age: number;
  };
  applyDefaultDto: true;
}>;

export const useGETAllPost = createAxiosQueryHook<UsePostType>({
  endPoint: () => "/posts22",
  name: ({age, postId}) => ["post", age, postId],
  method: "GET",
  timeout: 2000,
  options: {
    onError: (error) => {
      toast(error.message);
    },
  },
});

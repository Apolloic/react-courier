import {CreateApi} from "../lib/axiosQuery";
import {AQHookTypeHelper, AQMethodTypeHelper} from "../lib/axiosQuery/types";
import {toast} from "react-toastify";

type UsePostType = AQHookTypeHelper<{
  method: AQMethodTypeHelper<"GET">;
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

export const useGETAllPost = CreateApi<UsePostType>({
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

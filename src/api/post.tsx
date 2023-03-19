import {createAxiosQueryHook} from "../lib/axiosQuery/hookCreator";
import {AQHookTypeHelper, AQMethodTypeHelper} from "../lib/axiosQuery/hookCreatorType";

type UsePostType = AQHookTypeHelper<{
  method: AQMethodTypeHelper<"POST">;
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
  dynamicRequestData: {
    name: string;
  };
  staticRequestData: {
    userId: 100;
    id: 100;
    title: "test";
    body: "test Body";
  };
}>;

export const usePOSTAllPost = createAxiosQueryHook<UsePostType>({
  endPoint: () => "/posts",
  name: ({age, postId}) => ["post", age, postId],
  method: "POST",
  requestData: {
    userId: 100,
    id: 100,
    title: "test",
    body: "test Body",
  },
});

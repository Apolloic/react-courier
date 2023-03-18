import {createAxiosQueryHook} from "../lib/axiosQuery/hookCreator";
import {AxiosQueryTypeHelper} from "../lib/axiosQuery/hookCreatorType";

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
    firstName: string;
    lastName: string;
    id: number;
  }[];
  dynamicQueryParams: {
    age: number;
  };
  applyDefaultDto: true;
}>;

export const useGetAllPost =
  createAxiosQueryHook<UsePostType>({
    endPoint: () => "/posts",
    name: ({age, postId}) => ["post", age, postId],
    method: "GET",
    options: {
      applyDefaultDto: true,
    },
    dto(data) {
      return data.map((item) => ({
        firstName: item.firstName,
        id: item.id,
        lastName: item.lastName,
      }));
    },
  });

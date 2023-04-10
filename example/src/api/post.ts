import { CreateApi, CourierTypeHelper } from 'react-courier'

type useGetPostType = CourierTypeHelper<{
  dynamicQueryParams: {
    name: string
  }
  staticQueryParams: {
    age: number
  }
  applyDefaultDto: true
  endPointArgs: {
    postId: string
  }
  method: 'GET'
  responseData: {
    first_name: string
  }[]
}>

export const useGETPost = CreateApi<useGetPostType>({
  endPoint: ({ postId }) => `/posts/${postId}`,
  name: ['GET', 'posts'],
  method: 'GET',
  queryParams: ({ name }) => ({
    name: name + 'mamad',
    age: 12,
  }),
  options: {
    applyDefaultDto: true,
    onSuccess: (data) => console.log(data),
  },
})

// ==================== POST REQUEST =========================

type usePOSTPostType = CourierTypeHelper<{
  dynamicRequestData: {
    age: number
  }
  staticRequestData: {
    name: string
  }
  method: 'POST'
  responseData: {
    test: string
  }[]
}>

export const usePOSTPost = CreateApi<usePOSTPostType>({
  endPoint: '/posts',
  name: ['POST', 'posts'],
  method: 'POST',
  requestData: {
    name: 'erfan',
  },
})

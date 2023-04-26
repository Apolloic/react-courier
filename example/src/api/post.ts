import { CreateApi, CourierTypeHelper } from 'react-courier'

type useGetPostType = CourierTypeHelper<{
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
  dynamicQueryParams: {
    name: string
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
  queryParams: ({ name }) => {
    return {
      name: name + 'react-courier',
    }
  },
})

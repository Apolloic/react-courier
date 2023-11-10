import { CreateApi } from 'react-courier'

type UseGetPostApiType = {
  responseData: {
    body_admin: string
    id_admin: number
    title_admin: string
    userId_admin: string
  }
}

export const useGetPost = CreateApi<UseGetPostApiType>()({
  method: 'GET',
  name: ['test'],
  endPoint: '/posts',
  config: {
    applyDefaultDto: true,
  },
})

type AddPostApiType = {
  urlParams: {
    id: number
  }
  dynamicQueryParams: {
    id: number
    name: string
    age: number
  }
  dynamicRequestData: {
    body: string
  }
}
export const useAddPost = CreateApi<AddPostApiType>()({
  endPoint: ({ id }) => `/post/${id}`,
  method: 'DELETE',
  name: ['salam_chetori'],
})

import { CreateApi, AxiosQueryTypeHelper } from 'rest-hook'

type useGetPostType = AxiosQueryTypeHelper<{
  method: 'GET'
  responseData: {
    title: string
  }[]
}>

export const useGetPost = CreateApi<useGetPostType>({
  endPoint: '/posts',
  name: ['posts'],
  method: 'GET',
})

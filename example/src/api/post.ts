import { CreateApi, CourierTypeHelper } from 'react-courier'

type useGetPostType = CourierTypeHelper<{
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

import { CreateApi, CourierTypeHelper } from 'react-courier'

type useGetPostType = CourierTypeHelper<{
  responseDataAfterDto: {
    firstName: string
  }
  method: 'GET'
  responseData: {
    title: string
  }[]
  applyDefaultDto: true
}>

export const usePOSTPost = CreateApi<useGetPostType>({
  endPoint: '/posts',
  name: ['posts'],
  method: 'GET',
})

import { CourierTypeHelper, CreateApi } from 'react-courier'

type UseGetPostApiType = CourierTypeHelper<{
  endPointArgs: {
    postId: number
  }
  responseData: {
    body_admin: string
    id_admin: 1
    title_admin: string
    userId_admin: string
  }
  responseDataAfterDto: {
    name: string
    id: 1
    title: string
    user: string
  }
}>

export const useGetPost = CreateApi<UseGetPostApiType>()({
  name: ['salam'],
  endPoint: () => '/posts',
  dto: ({ bodyAdmin, idAdmin, titleAdmin, userIdAdmin }) => {
    return {
      id: idAdmin,
      name: 'test',
      title: 'test',
      user: 'test',
    }
  },
  method: 'GET',
  config: {
    applyDefaultDto: true,
  },
})

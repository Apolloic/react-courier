import { CreateApi } from 'react-courier'

type UseGetPostApiType = {
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
  dynamicQueryParams: {
    name: string
    ss: number
  }
}

export const useGetPost = CreateApi<UseGetPostApiType>()({
  name: ({ postId, name, ss }) => ['salam', name, ss],
  endPoint: () => '/posts',
  dto: ({ body_admin, id_admin, title_admin, userId_admin }) => {
    return {
      id: 1,
      name: 'sss',
      title: 'sss',
      user: 'ssss',
    }
  },
  config: {
    applyDefaultDto: false,
  },
  method: 'GET',
})

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
  dynamicQueryParams: {
    name: 'Jalal' | 'Ashghar'
  }
  dynamicRequestData: {
    body: string
  }
  urlParams: {
    name: 'erfan' | 'ali'
  }
}
export const useAddPost = CreateApi<AddPostApiType>()({
  endPoint: ({ name }) => {
    return `/post/${name}`
  },
  method: 'GET',
  name: ['salam_chetori'],
})

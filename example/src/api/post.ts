import { CreateRestHook } from 'rest-hook'

export const usePost = CreateRestHook({
  method: 'GET',
  name: ['post'],
  endPoint: '/posts',
})

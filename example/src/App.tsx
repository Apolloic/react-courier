import React, { FunctionComponent, useEffect } from 'react'
import { useGetPost } from './api/post'

interface AppPropsType {}

export const App: FunctionComponent<AppPropsType> = () => {
  const { data, isLoading } = useGetPost({
    queryParams: {
      ss: 0,
      name: '',
    },
    urlParams: {
      postId: 1,
    },
  })

  useEffect(() => {
    if (isLoading) return
    console.log(123, data)
  }, [data, isLoading])

  if (isLoading) return <div>Loading ...</div>
  return (
    <div>
      <h1>Hello React Courier</h1>
    </div>
  )
}

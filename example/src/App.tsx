import React, { FunctionComponent } from 'react'
import { useGETPost, usePOSTPost } from './api/post'

interface AppPropsType {}

export const App: FunctionComponent<AppPropsType> = () => {
  const { isLoading, data } = useGETPost({
    queryParams: {
      name: 'Erfaaaan',
    },
    options: {
      onSuccess: (data) => console.log(data),
    },
    urlParams: {
      postId: 2,
    },
  })

  const { mutate } = usePOSTPost()

  const onRequestHandler = () => {
    mutate({ age: 13 })
  }

  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <button onClick={onRequestHandler}>Request</button>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

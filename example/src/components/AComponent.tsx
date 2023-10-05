import { useGetPost } from '@/api/post'
import React, { FunctionComponent } from 'react'

interface AComponentPropsType {}

export const AComponent: FunctionComponent<AComponentPropsType> = () => {
  const { data, isLoading } = useGetPost({
    queryParams: {
      ss: 0,
      name: '',
    },
    urlParams: {
      postId: 1,
    },
    options: {
      refetchOnWindowFocus: false,
    },
  })

  if (isLoading) return <div>Loading ...</div>
  return (
    <div>
      <h1>A Component</h1>
    </div>
  )
}

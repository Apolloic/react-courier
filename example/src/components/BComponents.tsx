import React, { FunctionComponent } from 'react'
import { useGetPost } from '../api/post'

interface BComponentsPropsType {}

export const BComponents: FunctionComponent<BComponentsPropsType> = () => {
  const { data, isLoading } = useGetPost({
    queryParams: {
      ss: 0,
      name: '',
    },
    urlParams: {
      postId: 1,
    },
    options: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  })
  if (isLoading) return <div>Loading ...</div>
  return (
    <div>
      <h1>B Component</h1>
      <div>{data?.bodyAdmin}</div>
      <div>{data?.idAdmin}</div>
      <div>{data?.titleAdmin}</div>
      <div>{data?.userIdAdmin}</div>
    </div>
  )
}

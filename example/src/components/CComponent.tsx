import { useAddPost } from '@/api/post'
import React, { FunctionComponent } from 'react'

interface CComponentPropsType {}

export const CComponent: FunctionComponent<CComponentPropsType> = () => {
  const { data } = useAddPost({
    queryParams: {
      name: 'Ashghar',
    },
    urlParams: {
      name: 'ali',
    },
  })

  const onRequestHandler = (id: number) => {
    console.log(data)
  }

  return (
    <div>
      <h1>CComponent</h1>
      <button onClick={() => onRequestHandler(Math.floor(Math.random() * 10) + 1)}>Request!</button>
    </div>
  )
}

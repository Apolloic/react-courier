import { useAddPost } from '@/api/post'
import React, { FunctionComponent } from 'react'

interface CComponentPropsType {}

export const CComponent: FunctionComponent<CComponentPropsType> = () => {
  const { mutate } = useAddPost()

  const onRequestHandler = (id: number) => {
    mutate({
      requestData: {
        body: 'salam',
      },
      queryParams: {
        id: id,
        name: 'erfan',
        age: 555,
      },
      urlParams: {
        id: id,
      },
    })
  }

  return (
    <div>
      <h1>CComponent</h1>
      <button onClick={() => onRequestHandler(Math.floor(Math.random() * 10) + 1)}>Request!</button>
    </div>
  )
}

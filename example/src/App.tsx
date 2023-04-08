import React, { FunctionComponent } from 'react'
import { usePOSTPost } from './api/post'

interface AppPropsType {}

export const App: FunctionComponent<AppPropsType> = () => {
  const { data, isLoading } = usePOSTPost()
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      {data?.map((item) => (
        <p key={item.title}>{item.title}</p>
      ))}
    </div>
  )
}

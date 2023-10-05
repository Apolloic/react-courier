import { FunctionComponent, useState } from 'react'
import { AComponent } from './components/AComponent'
import { BComponents } from './components/BComponents'
import { CComponent } from './components/CComponent'

interface AppPropsType {}

export const App: FunctionComponent<AppPropsType> = () => {
  const [showB, setShowB] = useState(false)
  return (
    <div>
      <h1>Parent</h1>
      <button onClick={() => setShowB(!showB)}>Toggle B</button>
      <AComponent />
      {showB ? <BComponents /> : null}
      <CComponent />
    </div>
  )
}

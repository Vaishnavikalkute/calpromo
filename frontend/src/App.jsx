import { useState } from 'react'
import CalendarComponent from './component/calenderComponent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <h1>Calprom</h1>
      
        <CalendarComponent/>
      
      
    </div>
      
    
  )
}

export default App

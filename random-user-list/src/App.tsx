import { useEffect, useState } from 'react'
import './App.css'
import{type User} from './types.d'
import { UsersList } from './components/UsersList'
export function App() {
  const [users, setUsers]=useState<User[]>([])
  const [highlightRow, setHighlightRow]=useState(false)

  function toggleRowHighlight(){
    setHighlightRow(!highlightRow)
  }
  useEffect(()=>{
    fetch('https://randomuser.me/api/?results=100')
    .then(res=>res.json())
    .then(res=>{
      setUsers(res.results)
    })
    .catch(err=>{
      console.error(err)
    })
  },[])
  return (
    <div>
      <header>
        <button onClick={toggleRowHighlight}>Colorear filas</button>
      </header>
      <h1>Prueba tecnica</h1>
      {
        <UsersList highlightRow={highlightRow} users={users} />
      }
    </div>
    //40:10
    
  )
}

export default App

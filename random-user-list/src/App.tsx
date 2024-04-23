import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import{SortBy,FilterBy, type User} from './types.d'
import { UsersList } from './components/UsersList'
export function App() {
  const [users, setUsers]=useState<User[]>([])
  const [highlightRow, setHighlightRow]=useState(false)
  const[sorting, setSorting]=useState<SortBy>(SortBy.NONE)
  const[filterInput, setFilterInput]=useState<string|null>(null)
  const[filterBy, setFilterBy]=useState<FilterBy>(FilterBy.PAIS)
  const originalUsers=useRef<User[]>([])
  function toggleRowHighlight(){
    setHighlightRow(!highlightRow)
  }
  function toggleSortByCoutry(){
    const newSortingvalue = sorting === SortBy.NONE?SortBy.COUNTRY:SortBy.NONE
    setSorting(newSortingvalue)
  }
  function toggleFilter(filter:string):FilterBy{
    if(filter===FilterBy.PAIS) return FilterBy.PAIS
    if(filter===FilterBy.APELLIDO) return FilterBy.APELLIDO
    if(filter===FilterBy.NOMBRE) return FilterBy.NOMBRE

    return FilterBy.PAIS
  }
  const hadleChangeSort=(sort:SortBy)=>{
    setSorting(sort)
  }
  const handleDelete=(email:string)=>{
    const filteredUsersByEmail=users.filter((user)=>{
      return user.email!=email
    })
    setUsers(filteredUsersByEmail)
  }
  const handleReset=()=>{
    setUsers(originalUsers.current)
  }
  useEffect(()=>{
    fetch('https://randomuser.me/api/?results=100')
    .then(res=>res.json())
    .then(res=>{
      setUsers(res.results)
      originalUsers.current=res.results
    })
    .catch(err=>{
      console.error(err)
    })
  },[])

  const filteredUsers=useMemo(()=>{ 
    
    return filterInput!=null && typeof filterInput ==='string' && filterInput.length>0
    ?users.filter((user)=>{
        if(filterBy==FilterBy.PAIS){
          return user.location.country.toLowerCase().includes(filterInput.toLowerCase())
        }else if (filterBy==FilterBy.NOMBRE){
          return user.name.first.toLowerCase().includes(filterInput.toLowerCase())
        }else if (filterBy==FilterBy.APELLIDO){
          return user.name.last.toLowerCase().includes(filterInput.toLowerCase())
        }
    }):users
  },[users,filterInput,filterBy])
  //[...users]<- copia de users
  // .toSorted()->metodo para hacer una copia ordenada 

  
   const sortedUsers=useMemo(()=>{
   
    return( 
      sorting===SortBy.NONE? filteredUsers:
      [...filteredUsers].sort((a,b)=>{
       
        if(sorting===SortBy.COUNTRY){
          return a.location.country.localeCompare(b.location.country)
        }
        else if(sorting===SortBy.NAME){
          return a.name.first.localeCompare(b.name.first)
        }
        else if(sorting===SortBy.LAST){
          return a.name.last.localeCompare(b.name.last)
        }
        else{
          return 0;
        }
      })
    )
    
   },[filteredUsers, sorting])
    

  return (
    <div>
      <h1>Prueba tecnica</h1>
      <header>
        <button onClick={toggleRowHighlight}>{highlightRow?'Quitar destaque de filas':'Destacar filas'}</button>
        <button onClick={toggleSortByCoutry}>{sorting===SortBy.COUNTRY?'No ordernar por país':'Ordernar por país'}</button>
        <button onClick={handleReset}>Restaurar valores</button>
        <input type="text" placeholder={`Filtra por ${filterBy}`} name="" id="" onChange={(e)=>{
          setFilterInput(e.target.value)
          
        }}/>
        <select onChange={(e)=>{
          setFilterBy(toggleFilter(e.target.value))
        }}>
          <option value={FilterBy.PAIS}>País</option>
          <option value={FilterBy.NOMBRE}>Nombre</option>
          <option value={FilterBy.APELLIDO}>Apellido</option>
        </select>
      </header>
      {
        <UsersList changeSorting={hadleChangeSort} deleteUser={handleDelete} highlightRow={highlightRow} users={sortedUsers} />
      }
    </div>
    //40:10
    
  )
}

export default App

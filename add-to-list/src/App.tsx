import { useState } from 'react'
import './App.css'

interface Item{
  id: `${string}-${string}-${string}-${string}-${string}`,
  text: string
}
const InitialItems: Item[] = [
  {
    id: crypto.randomUUID(),
    text: "Elemento 1 ❌"
  },
  {
    id: crypto.randomUUID(),
    text: "Elemento 2 👤"
  },
  {
    id: crypto.randomUUID(),
    text: "Elemento 3 ▶️"
  },{
    id: crypto.randomUUID(),
    text: "Elemento 4 🔗"
  }
]

function App() {
  
  const[items, setItems] = useState(InitialItems)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const{elements}=event.currentTarget
    const input = elements.namedItem('elemento') 
    const isInput=input instanceof HTMLInputElement
    if(!isInput || isInput==null) return

    const newItem:Item={
      id: crypto.randomUUID(),
      text: input.value
    }

    setItems((prevItems)=> {
      return[...prevItems, newItem]
    })

    input.value=""
  }

  const removeActaulItem = (id: string) => ()=> {
      setItems((prevItems)=>{
        return prevItems.filter(actualItem=>actualItem.id!==id)
      })
    }
    
  
  return (
      <main>
        <aside>
          <h1>Añade Elementos a la lista</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Elemento a añadir
              <input type="text" name='elemento' required placeholder='Elemento 1 ⭐'/>
            </label>
            <button type="submit">Anadir</button>
          </form>
        </aside>

        <section>
          <h2>Lista de elementos</h2>
          <ul>
        {
          items.map(item=>{
            return (<li key={item.id}>{item.text} <button onClick={removeActaulItem(item.id)}>❌</button></li>)
          })
        }
          </ul>
        </section>
      </main>
  )
}

export default App

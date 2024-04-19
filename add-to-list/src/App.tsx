import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'
import { useSeo } from './hooks/useSeo'

export type ItemId=`${string}-${string}-${string}-${string}-${string}`
export interface Item{
  id: ItemId,
  text: string
}


function App() {

  const{items, addItem, removeItem}=useItems()
  useSeo({
    title:"Prueba Tecnica",
    description:"Lista de elementos"
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const{elements}=event.currentTarget
    const input = elements.namedItem('elemento') 
    const isInput=input instanceof HTMLInputElement
    if(!isInput || isInput==null) return

    addItem(input.value)

    input.value=""
  }
 
    
  
  return (
      <main>
        <aside>
          <h1>Añade Elementos a la lista</h1>
          <form role="form" aria-label="Contact information" onSubmit={handleSubmit}>
            <label>
              Elemento a añadir
              <input type="text" name='elemento' required placeholder='Elemento 1 ⭐'/>
            </label>
            <button type="submit">Anadir</button>
          </form>
        </aside>

        <section>
          <h2>Lista de elementos</h2>
          {items.length==0?(
            <p style={{color:'#9999'}}>Agrega Elementos a la lista</p>
          ):(

            <ul>
              {
                items.map((item)=>{
                  return (
                    <Item  
                      {...item} 
                      handleClick={removeItem(item.id)} 
                      key={item.id}
                    />
                  )
                })
              }
            </ul>
          )}
        </section>
      </main>
  )
}

export default App

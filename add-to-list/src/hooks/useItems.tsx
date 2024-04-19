import { useState } from "react"
import { Item } from "../App"

export const useItems = ()=>{

    const[items, setItems] = useState<Item[]>([])

    const addItem=(text:string)=>{
        const newItem:Item={
            id: crypto.randomUUID(),
            text: text
        }
    
        setItems((prevItems)=> {
            return[...prevItems, newItem]
        })
    }
    const removeItem = (id: string) => ()=> {
        setItems((prevItems)=>{
            return prevItems.filter(actualItem=>actualItem.id!==id)
        })
    }

    return {items, addItem, removeItem}
    
}
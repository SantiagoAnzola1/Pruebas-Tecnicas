import{describe,test,expect} from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../src/hooks/useItems'

describe('useItems Test Hook', ()=>{
    test('Add and remove items',()=>{
      const{result}=  renderHook(()=>useItems())
      expect(result.current.items.length).toBe(0)

      act(()=>{
        result.current.addItem('Jugar 🕹️')
      })

      expect(result.current.items.length).toBe(1)
    })
})
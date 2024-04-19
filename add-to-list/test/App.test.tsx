import React from 'react'
import{userEvent} from '@testing-library/user-event'
import {describe, test, expect} from 'vitest'
import{render,screen} from '@testing-library/react'

import App from '../src/App'
//End to end
describe('App', () => {
    // test('should render', () => {
    //     render(<App/>)
    //     screen.debug()

    //     expect(screen.getByText('Elemento 1 ❌')).toBeDefined()
    // })

    test('Should add a new item and then remove it',async()=>{

        const user=userEvent.setup()

        render(<App/>)
        
        //buscar el input 
        const input=screen.getByRole('textbox')
        expect(input).toBeDefined()

        //buscar el form
        const form =screen.getByRole('form')
        expect(form).toBeDefined()

        const button=form.querySelector('button')
        expect(button).toBeDefined()

        //palabra unica a añadir
        const ramdomText=crypto.randomUUID()

        await user.type(input, ramdomText)
        await user.click(button!)

        //verificar el item agregado
        const list=screen.getByRole('list')
        expect(list).toBeDefined()

        expect(list.childNodes.length).toBe(1)

        //verificar eliminar item

        const item=screen.getByText(ramdomText)
        expect(item).toBeDefined()
        const removeButton=item.querySelector('button')
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)

        const noResults=screen.getByText('Agrega Elementos a la lista')
        expect(noResults).toBeDefined()



    })
})
import React from 'react'
import {describe, test, expect} from 'vitest'
import{render,screen} from '@testing-library/react'

import App from '../src/App'

describe('App', () => {
    test('should render', () => {
        render(<App/>)
        screen.debug()

        expect(screen.getByText('Elemento 1 ❌')).toBeTruthy()
    })
})
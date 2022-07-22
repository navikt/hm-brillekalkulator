import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { App } from './App'

describe('App', () => {
  test('render', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Kan barnet få brillestøtte?')).toBeDefined()
  })
})

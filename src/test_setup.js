import {render as _r} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { AuthProvider } from '../src/utils/auth';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";

export function render (children, params = {}){
  const { initialEntries = ['/home'], mocks = [] } = params
  return _r(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

import {render as _r} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { AuthProvider } from '../src/utils/auth';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";

jest.mock('../src/utils/firebase', () => {
  const originalModule = jest.requireActual('../src/utils/firebase');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    auth: { onAuthStateChanged: jest.fn() },
    signOut: jest.fn()
  }
})

export function render (children, params = {}){
  const { initialEntries = ['/test'], mocks = [] } = params
  return _r(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider initialCredential='token' initialUser='user'>
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

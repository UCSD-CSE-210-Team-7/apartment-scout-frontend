import {render as _r, screen, act, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React, {useContext} from 'react';
import Auth, { AuthProvider } from '../auth';
import { auth, signOut } from "../firebase";

function render (children, params = {}){
  const { initialEntries = ['/test'], mocks = [] } = params
  return _r(
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  )
}

jest.mock('../firebase', () => {
  const originalModule = jest.requireActual('../firebase');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    auth: { onAuthStateChanged: jest.fn() },
    signOut: jest.fn()
  }
})

beforeEach(() => {
  auth.onAuthStateChanged.mockClear()
  signOut.mockClear()
})

function Component(props){
  act(() => {
    props.verify(useContext(Auth))
  })
}

test("renders a child", () => {
  const verify = jest.fn()
  const { asFragment } = render(
    <AuthProvider>
      <Component verify={verify}/>
    </AuthProvider>
  )

  expect(verify.mock.calls).toHaveLength(1)
  expect(verify.mock.calls[0].credential).toBeUndefined()
  expect(verify.mock.calls[0].user).toBeUndefined()
});

test("calls logout", () => {
  const verify = jest.fn(async auth => {
      await auth.logout()
  })
  const { asFragment } = render(
    <AuthProvider>
      <Component verify={verify}/>
    </AuthProvider>
  )

  expect(verify.mock.calls).toHaveLength(1)
  expect(verify.mock.calls[0].credential).toBeUndefined()
  expect(verify.mock.calls[0].user).toBeUndefined()
  expect(signOut).toHaveBeenCalled()
});

test("registers callback", async () => {
  auth.onAuthStateChanged = jest.fn()
  const verify = jest.fn(async auth => {
      // await auth.logout()
  })
  const { asFragment } = render(
    <AuthProvider initialCredential='token' initialUser='user'>
      <Component verify={verify}/>
    </AuthProvider>
  )

  await waitFor(() => expect(auth.onAuthStateChanged).toHaveBeenCalled())
  expect(auth.onAuthStateChanged).toHaveBeenCalled()
});

test("sets credential with nullish callback value", async () => {
  auth.onAuthStateChanged = jest.fn(f => f({accessToken: 0}))
  const verify = jest.fn()
  const { asFragment } = render(
    <AuthProvider initialCredential={null} initialUser={null}>
      <Component verify={verify}/>
    </AuthProvider>
  )

  await waitFor(() => expect(auth.onAuthStateChanged).toHaveBeenCalled())
  await waitFor(() => expect(verify.mock.calls.length).toEqual(3))
  expect(verify.mock.calls.length).toEqual(3)
  expect(verify.mock.calls[0][0].credential).toBeNull()
  expect(verify.mock.calls[1][0].credential).toEqual(0)
  expect(verify.mock.calls[2][0].credential).toEqual(0)
});

test("sets credential with non-null callback value", async () => {
  auth.onAuthStateChanged = jest.fn(f => f({accessToken: 'token'}))
  const verify = jest.fn()
  const { asFragment } = render(
    <AuthProvider initialCredential={null} initialUser={null}>
      <Component verify={verify}/>
    </AuthProvider>
  )

  await waitFor(() => expect(auth.onAuthStateChanged).toHaveBeenCalled())
  await waitFor(() => expect(verify.mock.calls.length).toEqual(2))
  expect(verify.mock.calls.length).toEqual(2)
  expect(verify.mock.calls[0][0].credential).toBeNull()
  expect(verify.mock.calls[1][0].credential).toEqual('token')
});

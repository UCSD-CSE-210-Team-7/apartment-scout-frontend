import { render as _r, screen, act, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { render } from '../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter, BrowserRouter, RouterProvider, createMemoryRouter, createRoutesFromElements, Routes, Route } from 'react-router-dom';

import { data } from '../../dummy_data/me.json'
import Welcome, { MUTATION_CREATE_USER  }  from '../Welcome';
import { signInWithPopup } from "../../utils/firebase";

test("render", () => {
  const { asFragment } = render( 
    <Welcome/>,
  );
  expect(asFragment()).toMatchSnapshot()
});

test("login new user", async () => {
  signInWithPopup.mockReturnValue({ 
    user: {
      displayName: 'name',
      accessToken: 'token',
    }
  })

  const result = jest.fn(() => ({
    data: {
      createUser: {
        name: 'name',
        email: 'email@email.com'
      }
    }
  }))

  const { asFragment } = render( 
    <Routes>
      <Route path="/test" element={ <Welcome/> }/>
      <Route path="/profile" element={ <h1>test passed</h1> }/>
    </Routes>,
    {
      mocks: [
        {
          request: {
            query: MUTATION_CREATE_USER,
            variables: {
              name: 'name',
            }
          },
          result,
        }
      ]
    }
  );
  await act(async () => 
    await userEvent.click(screen.getByRole('button'))
  )
  expect(signInWithPopup).toHaveBeenCalled()
  await waitFor(() => expect(result).toHaveBeenCalled())

  await waitFor(() => screen.getByText('test passed'))
  expect(screen.getByText('test passed')).toBeInTheDocument()
});

test("login existing user", async () => {
  signInWithPopup.mockReturnValue({ 
    user: {
      displayName: 'name',
      accessToken: 'token',
    }
  })

  const result = jest.fn(() => ({
    errors: [
      new Error('user already exists')
    ]
  }))

  const { asFragment } = render( 
    <Routes>
      <Route path="/test" element={ <Welcome/> }/>
      <Route path="/home" element={ <h1>test passed</h1> }/>
    </Routes>,
    {
      mocks: [
        {
          request: {
            query: MUTATION_CREATE_USER,
            variables: {
              name: 'name',
            }
          },
          result,
        }
      ]
    }
  );
  expect(screen.getByRole('button')).toBeInTheDocument();
  await act(async () => 
    await userEvent.click(screen.getByRole('button'))
  )
  expect(signInWithPopup).toHaveBeenCalled()
  await waitFor(() => expect(result).toHaveBeenCalled())

  await waitFor(() => screen.getByText('test passed'))
  expect(screen.getByText('test passed')).toBeInTheDocument()

});

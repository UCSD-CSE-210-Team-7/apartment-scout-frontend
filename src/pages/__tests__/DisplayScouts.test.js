import { render as _r, screen, act, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { render } from '../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter, BrowserRouter, RouterProvider, createMemoryRouter, createRoutesFromElements, Routes, Route } from 'react-router-dom';

import { data } from '../../dummy_data/regions.json'
import DisplayScouts, { QUERY_USER_BY_REGIONS } from '../DisplayScouts';

test("render", () => {
  const { asFragment } = render( <DisplayScouts /> );
  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByText('Enter a zipcode first!')).not.toBeNull()
});

test("typing in textbox", () => {
  const { asFragment } = render( <DisplayScouts /> );
  act( () => userEvent.type(screen.getByRole('textbox'), 'hi there') )
  expect(screen.getByDisplayValue('hi there')).not.toBeNull()
  expect(asFragment()).toMatchSnapshot()
});



test("entering a valid zipcode and clicking go", async () => {
  const { asFragment } = render( 
    <DisplayScouts /> ,
    { 
      mocks: [ 
        { 
          request: { 
            query: QUERY_USER_BY_REGIONS, 
            variables: { zipcode: 10010 }
          },
          result: { data }
        },
      ] , 
      initialEntries: ['/test']
    }
  );
  act( () => {
    userEvent.type(screen.getByRole('textbox'), '10010');
    userEvent.click(screen.getByRole('button'));
  })

  expect(screen.getByText('Loading...')).not.toBeNull();
  await waitForElementToBeRemoved(screen.getByText('Loading...'));

  expect(asFragment()).toMatchSnapshot()
  expect(screen.getAllByRole('link').length).toBe(data.usersByRegion.users.length)
  expect(screen.getAllByRole('link').map(i => i.href)).toEqual(data.usersByRegion.users.map(i => `http://localhost/browse/${i.email}`))
});


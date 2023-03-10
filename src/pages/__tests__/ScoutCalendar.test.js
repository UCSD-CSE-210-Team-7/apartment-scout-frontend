import { render as _r, screen, act, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { render } from '../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter, BrowserRouter, RouterProvider, createMemoryRouter, createRoutesFromElements, Routes, Route } from 'react-router-dom';

import { data } from '../../dummy_data/users.json'
import ScoutCalendar, { QUERY_USER_DETAILS, CREATE_TOUR } from '../ScoutCalendar';

test("render", () => {
  const { asFragment } = render( 
    <Routes>
      <Route path="/test/:email" element={<ScoutCalendar />} />
    </Routes>,
    { 
      mocks: [ 
        { 
          request: { 
            query: QUERY_USER_DETAILS, 
            variables: { email: 'test@gmail.com' }
          },
          result: { data : { userDetails: data.users} }
        },
      ] , 
      initialEntries: ['/test/test@gmail.com']
    }
  )
  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByTitle('loading')).not.toBeNull()
});

test("render with no calendly", async () => {
  const { container, asFragment } = render( 
    <Routes>
      <Route path="/test/:email" element={<ScoutCalendar />} />
    </Routes>,
    { 
      mocks: [ 
        { 
          request: { 
            query: QUERY_USER_DETAILS, 
            variables: { email: 'test@gmail.com' }
          },
          result: { data : { userDetails: data.users.filter(i => i.tours.length > 0 && !i.calendly_link)[0]} }
        },
      ] , 
      initialEntries: ['/test/test@gmail.com']
    }
  );

  await waitForElementToBeRemoved(screen.getByTitle('loading'));

  expect(asFragment()).toMatchSnapshot()
});


test("entering a tour address and clicking go", async () => {

  const mockCreate = jest.fn(() => ({ 
    data : { 
      createTour: {
        tour_id: -1,
        tour_address: 'test_address',
        date_requested: new Date(),
        status: 'planned',
      } 
    }
  }))

  const { container, asFragment } = render( 
    <Routes>
      <Route path="/test/:email" element={<ScoutCalendar />} />
    </Routes>,
    { 
      mocks: [ 
        { 
          request: { 
            query: QUERY_USER_DETAILS, 
            variables: { email: 'test@gmail.com' }
          },
          result: { 
            data : { 
              userDetails: data.users.filter(i => i.tours.length > 0 && i.calendly_link)[0]
            } 
          }
        },
        { 
          request: { 
            query: CREATE_TOUR, 
            variables: { scoutedBy: 'test@gmail.com', tourAddress: 'test address' }
          },
          result: mockCreate,
        },
      ] , 
      initialEntries: ['/test/test@gmail.com']
    }
  );

  await waitForElementToBeRemoved(screen.getByTitle('loading'));

  act( () => {
    userEvent.type(screen.getByRole('textbox'), 'test address');
  })


  await fireEvent(
    window, 
    new MessageEvent('message', { data: { event: 'calendly.event_scheduled'}})
  )

  await waitFor( () => expect(mockCreate).toHaveBeenCalled())

  expect(mockCreate).toHaveBeenCalled()
});


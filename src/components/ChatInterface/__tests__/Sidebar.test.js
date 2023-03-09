import { screen, act, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from '../../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { data } from '../../../dummy_data/conversations.json'

import SideBar, { QUERY_CONVERSATIONS} from '../Sidebar';

test("render with no user", () => {
  const { asFragment } = render( 
    <SideBar/>, 
    { mocks: [ 
      { 
        request: { query: QUERY_CONVERSATIONS, }, 
        result: { data: { me: { conversations: data.conversations } } }
      }
    ] }
  );
  expect(asFragment()).toMatchSnapshot()
});

test("render with user", async () => {
  const { asFragment } = render( 
    <SideBar user="test@gmail.com"/>, 
    { mocks: [ 
      { 
        request: { query: QUERY_CONVERSATIONS, }, 
        result: { data: { me: { conversations: data.conversations } } }
      }
    ] }
  );
  await waitForElementToBeRemoved(screen.getByText('Loading...'));
  expect(asFragment()).toMatchSnapshot()
});


test("data can be seen", async () => {
  const { asFragment } = render( 
    <SideBar user="test@gmail.com"/>, 
    { mocks: [ 
      { 
        request: { query: QUERY_CONVERSATIONS, }, 
        result: { data: { me: { conversations: data.conversations } } }
      }
    ] }
  );
  expect(await screen.findByText('Test User')).not.toBeNull()
});

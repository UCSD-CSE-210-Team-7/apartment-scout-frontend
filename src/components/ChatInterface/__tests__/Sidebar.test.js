import { screen, act, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from '../../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { data } from '../../../dummy_data/me.json'

import SideBar from '../Sidebar';

test("render with no user", () => {
  const onSelectConversation = jest.fn()
  const { asFragment } = render( 
    <SideBar conversations={undefined} selectedConversation={undefined} onSelectConversation={onSelectConversation}/>, 
  );
  expect(asFragment()).toMatchSnapshot()
});

test("data can be seen", async () => {
  const onSelectConversation = jest.fn()
  const { asFragment } = render( 
    <SideBar conversations={data.me.conversations} selectedConversation={undefined} onSelectConversation={onSelectConversation}/>, 
  );
  expect(await screen.findByText('Shubham Kulkarni')).not.toBeNull()
  expect(asFragment()).toMatchSnapshot()
});

test("conversation can be clicked", async () => {
  const onSelectConversation = jest.fn()
  const { asFragment } = render( 
    <SideBar conversations={data.me.conversations} selectedConversation={undefined} onSelectConversation={onSelectConversation}/>, 
  );
  userEvent.click(screen.getByText('Shubham Kulkarni'))
  expect(asFragment()).toMatchSnapshot()
  expect(onSelectConversation).toHaveBeenCalled()
});

test("selected conversation color change", async () => {
  const onSelectConversation = jest.fn()
  const { container, asFragment } = render( 
    <SideBar conversations={data.me.conversations} selectedConversation={data.me.conversations[0]} onSelectConversation={onSelectConversation}/>, 
  );
  expect(asFragment()).toMatchSnapshot()
  // console.log([...container.querySelectorAll('.userChat')].map(i => i.style.background))
  // screen.debug()
});

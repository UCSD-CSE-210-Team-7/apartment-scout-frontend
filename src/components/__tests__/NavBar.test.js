import {screen, act} from '@testing-library/react'
import { render } from '../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Auth from '../../utils/auth';
import NavBar from '../NavBar';

test("render", () => {
  const { asFragment } = render( <NavBar /> );
  expect(asFragment()).toMatchSnapshot()
});

test("click buttons", async () => {
  const { asFragment } = render( <NavBar /> );
  expect(screen.getByRole('link', {name: 'apt scout'})).toHaveAttribute('href', '/home')

  expect(screen.getByRole('link', {name: 'home'})).toHaveAttribute('href', '/home')

  expect(screen.getByRole('link', {name: 'chat'})).toHaveAttribute('href', '/chat')

  expect(screen.getByRole('link', {name: 'profile'})).toHaveAttribute('href', '/profile')

  expect(screen.getByRole('link', {name: 'tours'})).toHaveAttribute('href', '/tours')
});

import {screen, act} from '@testing-library/react'
import { render } from '../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { data } from '../../dummy_data/users.json'
import userImg from "../../img/user.png";

import ScoutCard from '../ScoutCard';

test("render no data", () => {
  const { asFragment } = render( <ScoutCard /> );
  expect(asFragment()).toMatchSnapshot()
});

test("render with dummy data", () => {
  const { asFragment } = render( <ScoutCard userImage={userImg} user={data.users[0]}/> );
  expect(asFragment()).toMatchSnapshot()
});

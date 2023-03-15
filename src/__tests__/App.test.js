import {
  render as _r,
  screen,
  act,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { render } from "../test_setup";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

test("renders signin page", () => {
  _r(<App />);

  expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  expect(screen.getByText(/apt/i)).toBeInTheDocument();
  expect(screen.getByText(/scout/i)).toBeInTheDocument();
});

import {
  render as _r,
  screen,
  act,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { render } from "../../test_setup";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  MemoryRouter,
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
  Routes,
  Route,
} from "react-router-dom";

import { data } from "../../dummy_data/me.json";
import ChatPage, {
  QUERY_CONVERSATIONS,
  SEND_MESSAGE,
  MESSAGE_SUBSCRIPTION,
} from "../ChatPage";

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  dateNowSpy = jest
    .spyOn(Date.prototype, "toLocaleString")
    .mockImplementation(() => "dummy date");
});

test("render with no user", () => {
  const { asFragment } = render(<ChatPage />, {
    mocks: [
      {
        request: {
          query: QUERY_CONVERSATIONS,
          variables: { conversation_id: undefined },
        },
        result: { data },
      },
      {
        request: { query: MESSAGE_SUBSCRIPTION },
        result: { message: data.me.conversations[0].messages[0] },
      },
    ],
  });
  expect(asFragment()).toMatchSnapshot();
});

test("render after loading", async () => {
  const { asFragment } = render(<ChatPage />, {
    mocks: [
      {
        request: {
          query: QUERY_CONVERSATIONS,
          variables: { conversation_id: undefined },
        },
        result: { data },
      },
      {
        request: { query: MESSAGE_SUBSCRIPTION },
        result: { data: { message: null } },
      },
    ],
  });
  await waitForElementToBeRemoved(screen.getByTitle("loading"));
  expect(asFragment()).toMatchSnapshot();
});

test("click a user", async () => {
  const { asFragment } = render(<ChatPage />, {
    mocks: [
      {
        request: {
          query: QUERY_CONVERSATIONS,
          variables: { conversation_id: undefined },
        },
        result: { data },
      },
      {
        request: { query: MESSAGE_SUBSCRIPTION },
        result: { data: { message: null } },
      },
    ],
  });
  await waitForElementToBeRemoved(screen.getByTitle("loading"));
  act(() => {
    userEvent.click(screen.getByText("Manasi Agrawal"));
  });
  expect(asFragment()).toMatchSnapshot();
});

test("click user, subscribed", async () => {
  const { asFragment } = render(<ChatPage />, {
    mocks: [
      {
        request: {
          query: QUERY_CONVERSATIONS,
          variables: { conversation_id: undefined },
        },
        result: { data },
      },
      {
        request: { query: MESSAGE_SUBSCRIPTION },
        result: {
          data: {
            message: {
              msg_id: -1,
              msg_text: "Hi. This is Shubham.",
              msg_time: "2023-03-10T15:35:13.289Z",
              sender: {
                name: "Shubham Kulkarni",
                email: "skulkarn@ucsd.edu",
              },
              conversation: {
                conversation_id: 1,
                person_a: {
                  email: "skulkarn@ucsd.edu",
                  name: "Shubham Kulkarni",
                },
                person_b: {
                  email: "maagrawa@ucsd.edu",
                  name: "Manasi Agrawal",
                },
              },
            },
          },
        },
      },
    ],
  });
  await waitForElementToBeRemoved(screen.getByTitle("loading"));
  act(() => {
    userEvent.click(screen.getByText("Manasi Agrawal"));
  });
  expect(asFragment()).toMatchSnapshot();
});

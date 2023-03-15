import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { render } from "../../../test_setup";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { data } from "../../../dummy_data/me.json";

import Chat, {
  QUERY_MESSAGES,
  SEND_MESSAGE,
  MESSAGE_SUBSCRIPTION,
} from "../Chat";

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  dateNowSpy = jest
    .spyOn(Date.prototype, "toLocaleString")
    .mockImplementation(() => "dummy date");
});

test("render with no user", () => {
  const { asFragment } = render(
    <Chat loading={true} conversation={undefined} sendMessage={() => null} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("render with conversation", async () => {
  const { asFragment } = render(
    <Chat
      conversation={data.me.conversations[0]}
      sendMessage={() => null}
      loading={false}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("send new message", async () => {
  const msg_text = "test message";
  const sendMessage = jest.fn();
  const { asFragment } = render(
    <Chat
      conversation={data.me.conversations[0]}
      sendMessage={sendMessage}
      loading={false}
    />
  );

  const textbox = screen.getByRole("textbox");
  fireEvent.change(textbox, { target: { value: msg_text } });
  fireEvent.click(screen.getByAltText("send-button"));
  expect(asFragment()).toMatchSnapshot();
  expect(sendMessage).toHaveBeenCalled();
  // await waitFor( () => screen.findByText(msg_text));
});

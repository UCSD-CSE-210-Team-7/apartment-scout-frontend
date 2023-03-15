import { render } from "../../test_setup";
import {
  render as _r,
  screen,
  act,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
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

import { data } from "../../dummy_data/users.json";
import Profile, { QUERY_USER_DETAILS, UPDATE_USER_MUTATION } from "../Profile";

/*
test("render", async () => {
    const { asFragment } = render(<Profile />,
        {
            mocks: [
                {
                    request: {
                        query: QUERY_USER_DETAILS,
                        variables: {}
                    },
                    result: {
                        data: {
                            me: data.user[0]
                        }
                    }
                },
            ],
            initialEntries: ['/test']
        }
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByTitle('loading')).not.toBeNull();
    // await waitForElementToBeRemoved(screen.queryByTitle('loading'));
});
*/

test("profile data shows up", async () => {
  const expectedUser = data.users.filter((i) => i.calendly_link)[0];
  const { asFragment } = render(<Profile />, {
    mocks: [
      {
        request: {
          query: QUERY_USER_DETAILS,
          variables: {},
        },
        result: {
          data: {
            me: expectedUser,
          },
        },
      },
    ],
    initialEntries: ["/test"],
  });
  await waitForElementToBeRemoved(screen.queryByTitle("loading"));
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByDisplayValue(expectedUser.email)).toBeInTheDocument();
  expect(screen.getByDisplayValue(expectedUser.name)).toBeInTheDocument();
  expectedUser.regions.forEach((zipcode, i) =>
    expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument()
  );
});

test("change name", async () => {
  const expectedUser = data.users[0];
  const { asFragment } = render(<Profile />, {
    mocks: [
      {
        request: {
          query: QUERY_USER_DETAILS,
          variables: {},
        },
        result: {
          data: {
            me: expectedUser,
          },
        },
      },
      {
        request: {
          query: UPDATE_USER_MUTATION,
          variables: {
            email: expectedUser.email,
            name: "test_name",
            is_scout: expectedUser.is_scout,
            created_on: expectedUser.created_on,
            last_login: expectedUser.last_login,
            regions: expectedUser.regions,
            calendly_link: expectedUser.calendly_link,
            tours: [
              {
                tour_id: 2,
                tour_review_text:
                  "Thanks for the excellent tour. I'll rent ASAP",
                tour_review_stars: 5,
              },
            ],
            image: "user.png",
          },
        },
        result: {
          data: {
            updateUser: { ...expectedUser, name: "test_name" },
          },
        },
      },
    ],
    initialEntries: ["/test"],
  });
  await waitForElementToBeRemoved(screen.queryByTitle("loading"));
  window.alert = () => {};

  await act(async () => {
    const name = screen.getByDisplayValue(expectedUser.name);
    await userEvent.clear(name);
    await userEvent.type(name, "test_name");
    await screen.findByDisplayValue("test_name");
    await userEvent.click(screen.getByText("Save"));
  });

  await screen.findByText("Saving...");
  await screen.findByText("Save");

  expect(screen.getByDisplayValue("test_name")).toBeInTheDocument();
});

test("change calendly_link", async () => {
  const expectedUser = data.users[0];
  const { asFragment } = render(<Profile />, {
    mocks: [
      {
        request: {
          query: QUERY_USER_DETAILS,
          variables: {},
        },
        result: {
          data: {
            me: expectedUser,
          },
        },
      },
      {
        request: {
          query: UPDATE_USER_MUTATION,
          variables: {
            email: expectedUser.email,
            name: expectedUser.name,
            is_scout: expectedUser.is_scout,
            created_on: expectedUser.created_on,
            last_login: expectedUser.last_login,
            regions: expectedUser.regions,
            calendly_link: "new_calendly_link",
            tours: [
              {
                tour_id: 2,
                tour_review_text:
                  "Thanks for the excellent tour. I'll rent ASAP",
                tour_review_stars: 5,
              },
            ],
            image: "user.png",
          },
        },
        result: {
          data: {
            updateUser: { ...expectedUser, calendly_link: "new_calendly_link" },
          },
        },
      },
    ],
    initialEntries: ["/test"],
  });
  await waitForElementToBeRemoved(screen.queryByTitle("loading"));
  window.alert = () => {};

  await act(async () => {
    const calendly = screen.getByPlaceholderText(/paste calendly link here/i);
    await userEvent.type(calendly, "new_calendly_link");
    await screen.findByDisplayValue("new_calendly_link");
    await userEvent.click(screen.getByText("Save"));
  });

  await screen.findByText("Saving...");
  await screen.findByText("Save");

  expect(screen.getByDisplayValue("new_calendly_link")).toBeInTheDocument();
});

test("profile regions change", async () => {
  const expectedUser = data.users[0];
  const updatedRegions = expectedUser.regions.slice();
  updatedRegions[1] = 91112;
  const serverReply = JSON.parse(JSON.stringify(expectedUser));
  serverReply.regions = updatedRegions;
  const { asFragment } = render(<Profile />, {
    mocks: [
      {
        request: {
          query: QUERY_USER_DETAILS,
          variables: {},
        },
        result: {
          data: {
            me: expectedUser,
          },
        },
      },
      {
        request: {
          query: UPDATE_USER_MUTATION,
          variables: {
            email: expectedUser.email,
            name: expectedUser.name,
            is_scout: expectedUser.is_scout,
            created_on: expectedUser.created_on,
            last_login: expectedUser.last_login,
            regions: updatedRegions,
            calendly_link: expectedUser.calendly_link,
            tours: [
              {
                tour_id: 2,
                tour_review_text:
                  "Thanks for the excellent tour. I'll rent ASAP",
                tour_review_stars: 5,
              },
            ],
            image: "user.png",
          },
        },
        result: {
          data: {
            updateUser: serverReply,
          },
        },
      },
    ],
    initialEntries: ["/test"],
  });
  await waitForElementToBeRemoved(screen.queryByTitle("loading"));
  expect(asFragment()).toMatchSnapshot();

  expectedUser.regions.forEach((zipcode, i) =>
    expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument()
  );
  window.alert = () => {};

  await act(async () => {
    let zipCodeElement = screen.getByDisplayValue(expectedUser.regions[1]);
    await userEvent.clear(zipCodeElement);
    await userEvent.type(screen.getByDisplayValue(0), "91112");
  });

  await screen.findByDisplayValue("91112");
  act(() => userEvent.click(screen.getByText("Save")));
  await screen.findByText("Saving...");
  await screen.findByText("Save");
  serverReply.regions.forEach((zipcode, i) =>
    expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument()
  );
});

test("profile regions delete", async () => {
  const expectedUser = data.users[0];
  const updatedRegions = expectedUser.regions.slice(1);
  const serverReply = JSON.parse(JSON.stringify(expectedUser));
  serverReply.regions = updatedRegions;
  const { asFragment } = render(<Profile />, {
    mocks: [
      {
        request: {
          query: QUERY_USER_DETAILS,
          variables: {},
        },
        result: {
          data: {
            me: expectedUser,
          },
        },
      },
      {
        request: {
          query: UPDATE_USER_MUTATION,
          variables: {
            email: expectedUser.email,
            name: expectedUser.name,
            is_scout: expectedUser.is_scout,
            created_on: expectedUser.created_on,
            last_login: expectedUser.last_login,
            regions: expectedUser.regions.slice(1),
            calendly_link: expectedUser.calendly_link,
            tours: [
              {
                tour_id: 2,
                tour_review_text:
                  "Thanks for the excellent tour. I'll rent ASAP",
                tour_review_stars: 5,
              },
            ],
            image: "user.png",
          },
        },
        result: {
          data: {
            updateUser: serverReply,
          },
        },
      },
    ],
    initialEntries: ["/test"],
  });
  await waitForElementToBeRemoved(screen.queryByTitle("loading"));
  expect(asFragment()).toMatchSnapshot();

  expectedUser.regions.forEach((zipcode, i) =>
    expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument()
  );
  window.alert = () => {};
  act(() => {
    userEvent.click(screen.getAllByRole("button", { name: /x/i })[0]);
  });

  await waitFor(() => expect(screen.queryByText("92092")).toBeNull());
  act(() => userEvent.click(screen.getByRole("button", { name: /save/i })));

  await screen.findByText("Saving...");
  await screen.findByText("Save");

  serverReply.regions.forEach((zipcode, i) =>
    expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument()
  );
});

test("profile regions add", async () => {
  const expectedUser = data.users[0];
  const updatedRegions = [...expectedUser.regions, 12345];
  const serverReply = JSON.parse(JSON.stringify(expectedUser));
  serverReply.regions = updatedRegions;
  const { asFragment } = render(<Profile />, {
    mocks: [
      {
        request: {
          query: QUERY_USER_DETAILS,
          variables: {},
        },
        result: {
          data: {
            me: expectedUser,
          },
        },
      },
      {
        request: {
          query: UPDATE_USER_MUTATION,
          variables: {
            email: expectedUser.email,
            name: expectedUser.name,
            is_scout: expectedUser.is_scout,
            created_on: expectedUser.created_on,
            last_login: expectedUser.last_login,
            regions: [...expectedUser.regions, 12345],
            calendly_link: expectedUser.calendly_link,
            tours: [
              {
                tour_id: 2,
                tour_review_text:
                  "Thanks for the excellent tour. I'll rent ASAP",
                tour_review_stars: 5,
              },
            ],
            image: "user.png",
          },
        },
        result: {
          data: {
            updateUser: serverReply,
          },
        },
      },
    ],
    initialEntries: ["/test"],
  });
  await waitForElementToBeRemoved(screen.queryByTitle("loading"));
  expect(asFragment()).toMatchSnapshot();

  expectedUser.regions.forEach((zipcode, i) =>
    expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument()
  );
  window.alert = () => {};
  await act(async () => {
    await userEvent.click(screen.getByPlaceholderText("add new region"));
    await userEvent.keyboard("12345");
  });

  await screen.findByDisplayValue("12345");
  act(() => userEvent.click(screen.getByRole("button", { name: /save/i })));

  await screen.findByText("Saving...");
  await screen.findByText("Save");

  serverReply.regions.forEach((zipcode, i) =>
    expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument()
  );
});

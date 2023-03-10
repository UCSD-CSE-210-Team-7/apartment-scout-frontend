import { render as _r, screen, act, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { render } from '../../test_setup'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter, BrowserRouter, RouterProvider, createMemoryRouter, createRoutesFromElements, Routes, Route } from 'react-router-dom';


import { data } from '../../dummy_data/users.json'
import Profile, { QUERY_USER_DETAILS, UPDATE_USER_MUTATION } from '../Profile'



test("render", async () => {
    const { asFragment } = render(<Profile />);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Loading...')).not.toBeNull();
    await waitForElementToBeRemoved(screen.queryByText('Loading...'));
});

test("profile data shows up", async () => {
    const expectedUser = data.users[0]
    const { asFragment } = render(
        <Profile />,
        {
            mocks: [
                {
                    request: {
                        query: QUERY_USER_DETAILS,
                        variables: {}
                    },
                    result: {
                        data: {
                            me: expectedUser
                        }
                    }
                },
            ],
            initialEntries: ['/test']
        }
    );
    await waitForElementToBeRemoved(screen.queryByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByDisplayValue(expectedUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedUser.name)).toBeInTheDocument();
    expectedUser.regions.forEach((zipcode, i) => expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument())
        ;
});

test("profile regions change", async () => {
    const expectedUser = data.users[0];
    const updatedRegions = expectedUser.regions.slice();
    updatedRegions[1] = 91112;
    const serverReply = JSON.parse(JSON.stringify(expectedUser));
    serverReply.regions = updatedRegions;
    const { asFragment } = render(
        <Profile />,
        {
            mocks: [
                {
                    request: {
                        query: QUERY_USER_DETAILS,
                        variables: {}
                    },
                    result: {
                        data: {
                            me: expectedUser
                        }
                    }
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
                            tours: [{ "tour_id": 2, "tour_review_text": "Thanks for the excellent tour. I'll rent ASAP", "tour_review_stars": 5 }],
                            image: "user.png"
                        }
                    },
                    result: {
                        data: {
                            updateUser: serverReply
                        }
                    }
                }
            ],
            initialEntries: ['/test']
        }
    );
    await waitForElementToBeRemoved(screen.queryByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();

    expectedUser.regions.forEach((zipcode, i) => expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument());

    act(() => {
        let zipCodeElement = screen.getByDisplayValue(expectedUser.regions[1]);
        userEvent.clear(zipCodeElement);
        userEvent.type(zipCodeElement, '91112');
        userEvent.click(screen.getByText('Save'));
    });

    await screen.findByText('Saving...');
    await screen.findByText('Save');

    serverReply.regions.forEach((zipcode, i) => expect(screen.getByDisplayValue(zipcode)).toBeInTheDocument());
});
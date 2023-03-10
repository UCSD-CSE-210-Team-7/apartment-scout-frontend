import TourDetailsPage, { QUERY_TOUR_DETAILS } from "../TourDetailsPage";
import { render as _r, screen, act } from "@testing-library/react";
import { render } from "../../test_setup";
import { data } from "../../dummy_data/tour_details.json";
import { Routes, Route } from "react-router-dom";

test("render", async () => {
  render(
    <Routes>
      <Route path="/test/:tour_id" element={<TourDetailsPage />} />
    </Routes>,
    {
      mocks: [
        {
          request: {
            query: QUERY_TOUR_DETAILS,
            variables: { tour_id: 1 },
          },
          result: { data },
        },
      ],
      initialEntries: ["/test/1"],
    }
  );
  expect(screen.getByText("Loading")).not.toBeNull();
  await new Promise((res) => setTimeout(res, 1000));
  await act(async () => {
    expect(
      screen.getByText("Tour Details", { selector: "h1.title" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Requested By", {
        selector: "div.container div.line-row div.block-card h4",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Manasi Agrawal", {
        selector: "div.container div.line-row div.block-card p",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Scouted By", {
        selector: "div.container div.line-row div.block-card h4",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Shubham Kulkarni", {
        selector: "div.container div.line-row div.block-card p",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Address", {
        selector: "div.container div.line-row div.block-card h4",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("625 8th Avenue New York NY", {
        selector: "div.container div.line-row div.block-card p",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Payment", {
        selector: "div.container div.line-row div.block-card h4",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("$50", {
        selector: "div.container div.line-row div.block-card p",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Requested on", {
        selector:
          "div.container div.last-row div.vertical-col div.vertical-card h4",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("February 15", {
        selector:
          "div.container div.last-row div.vertical-col div.vertical-card p",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Completed on", {
        selector:
          "div.container div.last-row div.vertical-col div.vertical-card h4",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("February 16", {
        selector:
          "div.container div.last-row div.vertical-col div.vertical-card p",
      })
    ).toBeInTheDocument();
    const chatButton = await screen.findByRole("button", { name: "Chat" });
    expect(chatButton).toBeInTheDocument();
    const completeButton = await screen.findByRole("button", {
      name: "Complete",
    });
    expect(completeButton).toBeInTheDocument();
  });
});

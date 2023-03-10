import {
  render as _r,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { render } from "../../test_setup";
import { data } from "../../dummy_data/tour_summary.json";
import { Routes, Route } from "react-router-dom";
import TourSummaryPage, { QUERY_TOUR_DETAILS } from "../TourSummaryPage";

test("render", async () => {
  render(
    <Routes>
      <Route path="/test/:tour_id" element={<TourSummaryPage />} />
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
  expect(screen.getByTitle("loading")).not.toBeNull();
  await waitForElementToBeRemoved(screen.getByTitle("loading"));
  expect(
    screen.getByText("Very loud. Be cautious.", { selector: "div.container p" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Pictures of the Tour/i })
  ).toBeInTheDocument();
  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(3);
});

import { renderHook } from "@testing-library/react-hooks";
import { useGetNotes } from "./useGetNotes";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../App";

// The notesLoading function returns true in the initial render.
// The notesLoading function returns false.
// The notes function returns the correct value after the data has been fetched.

jest.mock("./useGetNotes");
describe("useGetNotes", () => {
  test("render true in the initial render of notesLoading function", () => {
    const { result } = renderHook(() => useGetNotes());
    expect(result.current.notesLoading).toBe(true);
  });
  test("notesLoading function returns false", () => {
    useGetNotes.mockReturnValue({
      notes: [],
      notesLoading: false,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const loadingScreen = screen.queryByText("Loading notes ...");

    expect(loadingScreen).not.toBeInTheDocument();
  });
  test("return note function with correct value", async () => {
    useGetNotes.mockReturnValue({
      notes: [
        {
          id: 1,
          note: "This is an important note.",
        },
      ],
      notesLoading: false,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("This is an important note.")
    ).toBeInTheDocument();
  });
});

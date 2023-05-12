import { HomePage } from "./HomePage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { App } from "../App";

const mock = {
  notes: [
    {
      id: 1,
      note: "This is an important note.",
    },
    {
      note: "super note",
      id: 2,
    },
    {
      note: "another note",
      id: 3,
    },
  ],
  notesLoading: true,
};

jest.mock("../data/useGetNotes", () => ({
  useGetNotes: () => {
    return mock;
  },
}));
describe("HomePage", () => {
  test("render the correct page title", () => {
    render(<HomePage />);

    const title = screen.getByText("Notes");
    expect(title).toBeInTheDocument();
  });

  test("render a loading message when data is being fetched.", () => {
    render(<HomePage />);

    const title = screen.getByText("Loading notes ...");
    expect(title).toBeInTheDocument();
  });
  test("render the notes table with correct content after data has been fetched", () => {
    render(<HomePage />);

    const id_1 = screen.getByText("This is an important note.");
    const id_2 = screen.getByText("super note");
    const id_3 = screen.getByText("another note");

    expect(id_1).toBeInTheDocument();
    expect(id_2).toBeInTheDocument();
    expect(id_3).toBeInTheDocument();

  });

  test("The “New Notes” page should render when the “Add” button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "Add new note" });
    await user.click(button);

    const newNoteText = screen.getByText("New Note");
    expect(newNoteText).toBeInTheDocument();
  });
});

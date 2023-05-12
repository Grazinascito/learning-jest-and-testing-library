import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { NewNotePage } from "./NewNotePage";
import { useSaveNote } from "../data/useSaveNote";

jest.mock("../data/useSaveNote");

describe("NewNotePage", () => {
  test("render the correct page title", async () => {
    render(
      <MemoryRouter>
        <NewNotePage />
      </MemoryRouter>
    );

    const title = await screen.findByText("New Note");
    expect(title).toBeInTheDocument();
  });

  test("render a success message when the note is successfully saved.", async () => {
    useSaveNote.mockReturnValue({
      handleSubmit: jest.fn(),
      saveResult: "success",
    });
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <NewNotePage />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /save/i });
    await user.click(button);

    const successMessage = await screen.findByText(
      "The note was successfully added"
    );

    expect(successMessage).toBeInTheDocument();
  });
  test.only("render an error message when the note is unsuccessfully saved.", async () => {
    useSaveNote.mockReturnValue({
      handleSubmit: jest.fn(),
      saveResult: "error",
    });
    const user = userEvent.setup();g
    render(
      <MemoryRouter>
        <NewNotePage />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /save/i });
    await user.click(button);

    const errorMessage = await screen.findByText(
      "There was a problem adding this note"
    );

    expect(errorMessage).toBeInTheDocument();
  });

  test("The home page should be rendered when the home link is clicked.", async () => {

  });
});

import { render, screen } from "@testing-library/react";
import { SearchForm } from "./SearchForm";
import userEvent from "@testing-library/user-event";

test("Submitting a search with no criteria should render validation error", async () => {
  const user = userEvent.setup()
  render(<SearchForm />);
  screen.getByPlaceholderText("Enter search criteria").focus()
  await user.keyboard("{enter}")
  const error = await screen.findByText("You must enter some search criteria")
  expect(error).toBeInTheDocument()
});

test("Submitting a search with criteria should render correct results", async () => {
  const user = userEvent.setup()
  render(<SearchForm />);
  screen.getByPlaceholderText("Enter search criteria").focus()
  await user.keyboard("apple{enter}")
  const text = await screen.findByText("Apple")
  expect(text).toBeInTheDocument()
  
});

test("Search indicator should show during search request", async () => {
  const user = userEvent.setup()
  render(<SearchForm />);
  await user.click(screen.getByText("Search"));
  await user.keyboard("apple{enter}")
  const loading = await screen.findByText("Searching ...")
  expect(loading).toBeInTheDocument()
  await screen.findByText("Apple");
  expect(await screen.queryByText("Searching ...")).not.toBeInTheDocument()

  
});

test("Submitting a search with criteria that does not match should render not found message", async () => {
  const user = userEvent.setup()
  render(<SearchForm />);
  screen.getByPlaceholderText("Enter search criteria").focus()
  await user.keyboard("fon{enter}")
  const text = await screen.findByText("None found")
  expect(text).toBeInTheDocument()
});

test("Clicking Clear button should clear criteria and results", async () => {
  const user = userEvent.setup()

  render(<SearchForm />);
  await screen.getByPlaceholderText("Enter search criteria").focus()
  user.keyboard("apple{enter}")
  await screen.findByText("Apple")
  await user.click(screen.getByText("Clear"));
  expect(screen.queryByText("Apple")).not.toBeInTheDocument()




});

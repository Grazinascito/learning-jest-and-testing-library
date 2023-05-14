import { screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useNoteField } from "./useNoteField";
import { act } from "react-dom/test-utils";

describe("useNoteField", () => {
  test("note returns an empty string in the initial render", async () => {
    const { result } = renderHook(() => useNoteField());
    const note = result.current.note;
    expect(note).toBe("");
  });
  test("handleNoteChange should update the note state and note returns updated state", () => {
    const { result } = renderHook(() => useNoteField());
    act(() => {
      result.current.handleNoteChange({ currentTarget: { value: "test" } });
    });

    expect(result.current.note).toBe("test");
  });
});

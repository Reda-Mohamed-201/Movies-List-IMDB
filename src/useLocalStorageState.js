import { useState } from "react";
export function useLocalStorageState(initialState , key) {
  const [value, setValue] = useState(function () {
    const storedVAlue = localStorage.getItem(key);
    return storedVAlue ? JSON.parse(storedVAlue): initialState;
  });
  return [value , setValue]
}

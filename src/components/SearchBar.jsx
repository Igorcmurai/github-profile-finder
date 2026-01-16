import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  onSearch,
  onClear,
  onEmpty,
  disabled,
  isLoading,
  requestFocus,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (requestFocus) {
      inputRef.current?.focus();
    }
  }, [requestFocus]);

  function handleSubmit(e) {
    e.preventDefault();
    const username = value.trim();

    if (!username) {
      onEmpty?.();
      inputRef.current?.focus();
      return;
    }

    onSearch(username);
  }

  function handleClear() {
    setValue("");
    onClear();
    inputRef.current?.focus();
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="searchRow">
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="Enter a GitHub username (e.g., torvalds)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck="false"
          autoFocus
          disabled={disabled}
        />

        <button className="btn" type="submit" disabled={disabled}>
          {isLoading ? "Searching..." : "Search"}
        </button>

        <button
          className="btnSecondary"
          type="button"
          onClick={handleClear}
          disabled={disabled && value.length === 0}
          aria-label="Clear search"
          title="Clear"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

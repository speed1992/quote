import React, { useEffect, useRef, useState } from "react";
import { retryTenTimes } from "../../../../../common/utils/apiUtils";
import styles from "./mobile-select.module.css";
const OutsideAlerter = React.lazy(() =>
  retryTenTimes(() =>
    import("../../../../../common/components/outside-alerter/outside-alerter")
  )
);

export default function MobileSelect({
  options,
  currentPhilosopher,
  onChangeHandler,
  onFocusHandlerCallback,
  placeholder,
  value,
  isFetchingOptions,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => setSearchText(value), [value]);
  const scollToRef = useRef();

  useEffect(() => {
    if (isFocused && options.length > 1) {
      setSearchText("");
      setSuggestions(options);
      setIsFocused(false);
    }
  }, [options.length, isFocused]);

  const onFocusHandler = (e) => {
    onFocusHandlerCallback();
    setIsFocused(true);
  };

  const onTextChange = (e) => {
    const value = e.target.value;
    if (value === "") setSuggestions(options);
    else {
      let suggestions = [];
      if (value.length > 0) {
        const regex = new RegExp(`${value}`, `i`);
        suggestions = options.filter(({ fullName }) => regex.test(fullName));
      }

      setSuggestions(suggestions);
    }
    setSearchText(value);
  };

  const onBlurHandler = () => {
    setSearchText(value);
  };

  const suggestionSelected = (fullName, value) => {
    if (value !== undefined) {
      setSuggestions([]);
      setSearchText(fullName);
      onChangeHandler({ target: { value } });
    }
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul ref={scollToRef} className="dropDownList">
        {suggestions &&
          suggestions.map(({ fullName, value }) => (
            <li
              id={currentPhilosopher === value ? "active" : ""}
              key={value}
              value={value}
              onClick={(e) => suggestionSelected(fullName, value)}
            >
              {fullName}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <OutsideAlerter callback={() => setSuggestions([])}>
      <div className="typeAheadDropDown">
        <input
          type="text"
          onFocus={onFocusHandler}
          onChange={onTextChange}
          placeholder={placeholder}
          value={searchText}
          onBlur={onBlurHandler}
        />
        {isFetchingOptions ? (
          <ul className="dropDownList">
            <li>Loading...</li>
          </ul>
        ) : (
          renderSuggestions()
        )}
      </div>
    </OutsideAlerter>
  );
}

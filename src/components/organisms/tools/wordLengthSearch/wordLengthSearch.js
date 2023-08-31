import React from "react";
import { retryTenTimes } from "../../../../common/utils/apiUtils";
import styles from "./wordLengthSearch.module.css";
const DesktopWordLengthSearch = React.lazy(() =>
  retryTenTimes(() =>
    import(
      "../../home/desktop/desktop-word-length-search/desktop-word-length-search"
    )
  )
);

export function WordLengthSearch({
  start,
  end,
  setStart,
  setEnd,
  setSearchText,
  isMobile,
}) {
  const renderComponent = () => {
    if (isMobile) {
      return (
        <>
          <label id="labelEnd" htmlFor="end">
            Words{" "}
          </label>
          <input
            id="end"
            className="smallInput"
            key="end"
            name="end"
            type="number"
            min="0"
            value={end}
            onChange={({ target: { value } }) => setEnd(value)}
          />
        </>
      );
    } else {
      return (
        <DesktopWordLengthSearch
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
        />
      );
    }
  };
  return renderComponent();
}

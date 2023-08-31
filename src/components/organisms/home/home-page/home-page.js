"use client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { doesPhilosopherDataExist } from "../../../../common/static/utils/utils";
import { retryTenTimes } from "../../../../common/utils/apiUtils";
import { applyFilters } from "../../../../common/utils/searchUtils";
import { isDesktop } from "../../../../common/utils/utils";
import { Header } from "../header-layout/header-layout";
import { LazyLoadQuoteList } from "../lazy-load-quote-list/lazy-load-quote-list";
import { getPhilosopherFullName } from "../quotes-list/utils/utils";
import styles from "./home-page.module.css";
import { useHomePageHooks } from "./utils/hooks";
import { useSortingHooks } from "./utils/sortingHook";
import { setThemeClassNameOnHTMLTag } from "./utils/utils";
const Loader = React.lazy(() =>
  retryTenTimes(() => import("../../../../common/components/loader/loader"))
);

const HomePage = () => {
  let propsToSend = useHomePageHooks();
  const { options, sorting, setSorting } = useSortingHooks();

  const {
    start,
    end,
    searchText,
    currentPhilosopher,
    currentData,
    markedMode,
    quotesLoaded,
    markedQuotes,
    darkMode,
    setDarkMode,
    originalData,
    isFetching,
    setCurrentData,
    setMarkedQuotes,
    isFetchingOptions,
    setIsFetchingOptions,
  } = propsToSend;

  propsToSend = {
    ...propsToSend,
    setSorting,
    sorting,
    isFetchingOptions,
    setIsFetchingOptions,
  };

  useEffect(() => {
    if (originalData) {
      applyFilters(
        {
          searchText,
          start,
          end,
          currentPhilosopher,
          currentData,
          originalData,
          setCurrentData,
          options,
        },
        { markedMode, markedQuotes, setMarkedQuotes }
      );
    }
  }, [
    start,
    end,
    searchText,
    markedMode,
    quotesLoaded,
    currentPhilosopher,
    currentData.length,
    markedQuotes[currentPhilosopher]?.quotes?.length,
  ]);

  useEffect(() => {
    setThemeClassNameOnHTMLTag(darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (isDesktop()) {
      setDarkMode(false);
      setThemeClassNameOnHTMLTag(false);
    }
  }, [darkMode]);

  if (!doesPhilosopherDataExist(currentPhilosopher, options)) return <></>;

  return (
    <div className={styles.homepage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {getPhilosopherFullName({ currentPhilosopher, options })} Quotes
        </title>
        <meta
          name="description"
          content="Life changing quotations by greatest philosophers"
        />
        <link rel="canonical" href="https://speed1992.github.io/quotes/" />
      </Helmet>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Header {...propsToSend} />
          <div className={styles.content}>
            <AutoSizer>
              {({ height, width }) => (
                <LazyLoadQuoteList
                  {...propsToSend}
                  width={width}
                  height={height}
                />
              )}
            </AutoSizer>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

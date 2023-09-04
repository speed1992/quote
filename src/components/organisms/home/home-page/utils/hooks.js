"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
import {
  doesPhilosopherDataExist,
  getPhilosopherQuotes,
} from "../../../../../common/static/utils/utils";
import { onFocusHandler } from "../../desktop/desktop-header/utils/utils";
import {
  setCurrentDataRedux,
  setCurrentPhilosopherRedux,
  setDarkModeRedux,
  setEndRedux,
  setIsLoggedInRedux,
  setMarkedModeRedux,
  setMarkedQuotesRedux,
  setOptionsRedux,
  setOriginalOptionsRedux,
  setPasswordRedux,
  setQuotesLoadedRedux,
  setScheduledPostsRedux,
  setScrollPositionRedux,
  setSearchTextRedux,
  setStartRedux,
  setSyncDateRedux,
  setUserNameRedux,
} from "../homePageRedux/homePageRedux";
import {
  compareWithServerSyncDatesAndMakeAnAPICall,
  getClientSyncDates,
} from "./utils";

export function useHomePageHooks() {
  // const [openSnackbar] = useSnackbar();
  const listRef = useRef();
  const dispatch = useDispatch();
  const start = useSelector((state) => state?.philosophersData?.start);
  const end = useSelector((state) => state?.philosophersData?.end);
  const searchText = useSelector(
    (state) => state?.philosophersData?.searchText
  );
  const currentPhilosopher = useSelector(
    (state) => state?.philosophersData?.currentPhilosopher
  );
  const currentData = useSelector(
    (state) => state?.philosophersData?.currentData
  );
  const markedMode = useSelector(
    (state) => state?.philosophersData?.markedMode
  );
  const options = useSelector((state) => state?.philosophersData?.options);
  const quotesLoaded = useSelector(
    (state) => state?.philosophersData?.quotesLoaded
  );
  const markedQuotes = useSelector(
    (state) => state?.philosophersData?.markedQuotes
  );
  const scheduledPosts = useSelector(
    (state) => state?.philosophersData?.scheduledPosts
  );
  const darkMode = useSelector((state) => state?.philosophersData?.darkMode);
  const scrollPosition = useSelector(
    (state) => state?.philosophersData?.scrollPosition
  );
  const originalData = getPhilosopherQuotes({
    philosopher: currentPhilosopher,
    options,
  });
  const originalOptions = useSelector(
    (state) => state?.philosophersData?.originalOptions
  );
  const userName = useSelector((state) => state?.philosophersData?.userName);
  const isLoggedIn = useSelector(
    (state) => state?.philosophersData?.isLoggedIn
  );
  const password = useSelector((state) => state?.philosophersData?.password);
  const syncDate = useSelector((state) => state?.philosophersData?.syncDate);
  const sorting = useSelector((state) => state.philosophersData.sorting);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);
  const [rowsRendered, setRowsRendered] = useState(false);

  const setStart = (value) => dispatch(setStartRedux(value));
  const setEnd = (value) => dispatch(setEndRedux(value));
  const setSearchText = (value) => dispatch(setSearchTextRedux(value));
  const setMarkedMode = (value) => dispatch(setMarkedModeRedux(value));
  const setCurrentPhilosopher = (name) =>
    dispatch(setCurrentPhilosopherRedux(name));
  const setCurrentData = (data) => dispatch(setCurrentDataRedux(data));
  const setOptions = (value) => dispatch(setOptionsRedux(value));
  const setQuotesLoaded = (value) => dispatch(setQuotesLoadedRedux(value));
  const setMarkedQuotes = (value) => dispatch(setMarkedQuotesRedux(value));
  const setScheduledQuotes = (value) => dispatch(setScheduledPostsRedux(value));
  const setDarkMode = (value) => dispatch(setDarkModeRedux(value));
  const setScrollPosition = (value) => dispatch(setScrollPositionRedux(value));
  const setOriginalOptions = (value) =>
    dispatch(setOriginalOptionsRedux(value));
  const setUserName = (value) => dispatch(setUserNameRedux(value));
  const setIsLoggedIn = (value) => dispatch(setIsLoggedInRedux(value));
  const setPassword = (value) => dispatch(setPasswordRedux(value));
  const setSyncDate = (value) => dispatch(setSyncDateRedux(value));

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const markedQuoteClientCount =
          Object.values(markedQuotes).flat().length;
        let { currentClientDate, lastSyncClientDate } =
          getClientSyncDates(syncDate);

        if (currentClientDate > lastSyncClientDate) {
          await compareWithServerSyncDatesAndMakeAnAPICall(
            userName,
            markedQuotes,
            openSnackbar,
            setMarkedQuotes,
            setSyncDate,
            markedQuoteClientCount,
            currentClientDate
          );
        }
      })();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!doesPhilosopherDataExist(currentPhilosopher, options)) {
      onFocusHandler({
        options,
        setOptions,
        isFetchingOptions,
        setIsFetchingOptions,
        originalOptions,
        setOriginalOptions,
        sorting,
      });
    }
  }, [currentPhilosopher]);

  return {
    listRef,
    dispatch,
    start,
    end,
    searchText,
    currentPhilosopher,
    currentData,
    markedMode,
    options,
    quotesLoaded,
    markedQuotes,
    scheduledPosts,
    darkMode,
    scrollPosition,
    originalData,
    isFetching,
    setIsFetching,
    setStart,
    setEnd,
    setSearchText,
    setMarkedMode,
    setCurrentPhilosopher,
    setCurrentData,
    setOptions,
    setQuotesLoaded,
    setMarkedQuotes,
    setScheduledQuotes,
    setDarkMode,
    setScrollPosition,
    originalOptions,
    setOriginalOptions,
    userName,
    setUserName,
    isLoggedIn,
    setIsLoggedIn,
    password,
    setPassword,
    isFetchingOptions,
    setIsFetchingOptions,
    rowsRendered,
    setRowsRendered,
  };
}

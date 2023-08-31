import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import ROUTES from "../../../../../common/routes/routes";
import { retryTenTimes } from "../../../../../common/utils/apiUtils";
import { ALPHABETICAL, LATEST } from "../../home-page/constants/constants";
import { setVoiceSpeedRedux } from "../../home-page/homePageRedux/homePageRedux";
import styles from "./mobile-menu.module.css";
const BuildInfo = React.lazy(() =>
  retryTenTimes(() => import("../../../tools/build-info/build-info"))
);
const LoginRegister = React.lazy(() =>
  retryTenTimes(() => import("../login-register/login-register"))
);
const OutsideAlerter = React.lazy(() =>
  retryTenTimes(() =>
    import("../../../../../common/components/outside-alerter/outside-alerter")
  )
);

function MobileMenu({
  markedMode,
  setMarkedMode,
  visible,
  toggleVisible,
  darkMode,
  setDarkMode,
  setSorting,
  sorting,
  userName,
  setUserName,
  setMarkedQuotes,
  isLoggedIn,
  setIsLoggedIn,
  password,
  setPassword,
  setIsFetching,
}) {
  const voiceSpeed = useSelector(
    ({ philosophersData: { voiceSpeed } }) => voiceSpeed
  );
  const markedQuotes = useSelector(
    ({ philosophersData: { markedQuotes } }) => markedQuotes
  );
  const [openSnackbar] = useSnackbar();

  const dispatch = useDispatch();

  const onClickSortButtonHandler = (event) => {
    const id = event.target.id;

    if (id === LATEST) setSorting(LATEST);
    else setSorting(ALPHABETICAL);
  };

  return (
    <OutsideAlerter callback={() => toggleVisible(false)}>
      <ul id="slide_menu" style={{ display: visible ? "block" : "none" }}>
        <li>
          Sort philosophers
          <div>
            <input
              type="radio"
              id={LATEST}
              name="sortType"
              onClick={onClickSortButtonHandler}
              defaultChecked={sorting === LATEST ? true : false}
            />
            <label htmlFor={LATEST}>Latest</label>
          </div>
          <div>
            <input
              type="radio"
              id={ALPHABETICAL}
              name="sortType"
              onClick={onClickSortButtonHandler}
              defaultChecked={sorting === ALPHABETICAL ? true : false}
            />
            <label htmlFor={ALPHABETICAL}>Alphabetical</label>
          </div>
        </li>
        <li>
          Marked Mode
          <input
            type="checkbox"
            checked={markedMode}
            onChange={({ target: { checked } }) => setMarkedMode(checked)}
          />
        </li>
        <li>
          Dark Mode
          <input
            type="checkbox"
            checked={darkMode}
            onChange={({ target: { checked } }) => setDarkMode(checked)}
          />
        </li>
        <li>
          Voice Speed[1-20]
          <input
            onChange={(event) =>
              dispatch(setVoiceSpeedRedux(event.target.value / 10))
            }
            className="voiceSpeed"
            type="number"
            value={voiceSpeed ? voiceSpeed * 10 : ""}
          />
        </li>
        <li>
          <Link
            to={ROUTES.report.route}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <button>Open Report</button>
          </Link>
        </li>
        <li>
          <LoginRegister
            {...{
              setUserName,
              userName,
              openSnackbar,
              isLoggedIn,
              setIsLoggedIn,
              setMarkedQuotes,
              markedQuotes,
              password,
              setPassword,
              setIsFetching,
            }}
          />
          {!isLoggedIn && (
            <div className="backupNote">
              You can login to backup your marked quotes in database in case
              browser data gets deleted.
            </div>
          )}
        </li>
        <li>
          <BuildInfo />
        </li>
      </ul>
    </OutsideAlerter>
  );
}

export default MobileMenu;

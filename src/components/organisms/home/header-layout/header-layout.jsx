import React, { Suspense } from "react";
import { retryTenTimes } from "../../../../common/utils/apiUtils";
import { isClient, isMobile } from "../../../../common/utils/utils";
import styles from "./header-layout.module.css";
const MobileHeader = React.lazy(() =>
  retryTenTimes(() => import("../mobile/mobile-header/mobile-header"))
);
const DesktopHeader = React.lazy(() =>
  retryTenTimes(() => import("../desktop/desktop-header/desktop-header"))
);

export const Header = (props) => {
  const { mobile, desktop } = styles;
  console.log("isClient()", isClient());
  return (
    <Suspense fallback={""}>
      {isClient() ? (
        isMobile() ? (
          <div className="mobile">
            <MobileHeader {...props} />
          </div>
        ) : (
          <div className="desktop">
            <DesktopHeader {...props} />
          </div>
        )
      ) : null}
    </Suspense>
  );
};

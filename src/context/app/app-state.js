import React, { useState } from "react";
import AppContext from "./app-context";

const AppState = (props) => {
  const [loadingState, setLoadingState] = useState(false);
  const [filterDate, setFilterDate] = useState({
    to: null,
    from: null,
  });

  return (
    <AppContext.Provider
      value={{
        loadingState,
        setLoadingState,
        filterDate,
        setFilterDate,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

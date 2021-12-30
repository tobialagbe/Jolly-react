import React, { useContext } from "react";
import Tab from "./tab";
import { css } from "@emotion/react";
import metricsContext from "../context/metrics/metrics-context";

const Tabs = ({ children }) => {
  const { metrics } = useContext(metricsContext);

  return (
    <div>
      <div css={tabsStyle}>
        {metrics && metrics.map((m, i) => <Tab key={i} metric={m}></Tab>)}
      </div>
      {children}
    </div>
  );
};

const tabsStyle = () => {
  return css`
    width: 75%;
    margin: 0px auto;

    & > span,
    button {
      border: none;
      margin: 5px;
      width: auto;
      height: auto;
      padding: 5px 10px;
      cursor: pointer;
      transition: all 300ms;
      &:hover {
        background: #c74719;
        color: white;
      }
    }
  `;
};

export default Tabs;

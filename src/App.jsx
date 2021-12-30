import React, { useContext, useEffect } from "react";
import { css } from "@emotion/react";
import logo from "./logo-grey.png";

import metricsContext from "./context/metrics/metrics-context";
import appContext from "./context/app/app-context";
import Fetcher from "./util/fetch";
import { apiUrl, repos } from "./util/constants";
import Tabs from "./components/tabs";
import Box from "./components/box";
import SelectMetrics from "./components/select";

import { DatePicker } from "antd";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

const App = () => {
  const {
    metrics,
    setMetrics,
    metricsData,
    setMetricsData,
    setActiveData,
    setActiveRepoData,
    setActiveMetric,
    activeMetricIndex,
    setActiveMetricIndex,
  } = useContext(metricsContext);

  const { filterDate, setFilterDate } =
    useContext(appContext);
  
  useEffect(()=>{
    if (!!localStorage.getItem('metrics')) {
      setMetrics(JSON.parse(localStorage.getItem('metrics')));
    }
  },[])

  useEffect(() => {
    const active =
      metrics.find((metric, metricIndex) => {
        setActiveMetricIndex(metricIndex);
        return metric.active;
      }) || metrics[0];
    setActiveMetric(active);
  }, [metrics]);

  useEffect(() => {
    (async () => {
      if (metrics.length < 1) return;
      const data = await Fetcher(apiUrl, metrics, filterDate);
      const mData = data.calculated.map((m) => {
        return m.values;
      });
      setMetricsData(mData);
      setData(mData);
    })();
  }, [metrics, filterDate]);

  useEffect(() => {
    setData(metricsData);
  }, [activeMetricIndex, filterDate]);

  const setData = (mData = metricsData) => {
    let resultArray = [];
    let matchIndex = 0;
    let res = [];

    const hasDate = (date) => {
      return resultArray.find((resObj, i) => {
        matchIndex = i;
        return resObj.date === date;
      });
    };

    mData?.forEach((repoArray) => {
      let sum = 0;
      let avg = 0;
      repoArray.forEach((dateObject) => {
        let activeValue = dateObject.values[activeMetricIndex];
        activeValue =
          typeof activeValue === "string"
            ? parseInt(activeValue.slice(0, -1))
            : activeValue;
        sum += activeValue;
        if (hasDate(dateObject.date)) {
          resultArray[matchIndex].value += activeValue;
        } else {
          resultArray.push({
            date: dateObject.date,
            value: activeValue,
          });
        }
      });
      avg = sum / repoArray.length;
      res.push(avg);
    });

    resultArray = resultArray.map((r) => {
      return {
        date: formatDate(r.date),
        value: r.value,
      };
    });

    const repoArray = res.map((r, i) => {
      return {
        avg: r,
        repo: repos[i],
      };
    });

    setActiveData(resultArray);
    setActiveRepoData(repoArray);
  };

  const formatDate = (dt) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObj = new Date(dt);
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    return `${month} ${day}`;
  };

  const onChange = (date, dateString) => {
    setFilterDate(dateString);
  };

  return (
    <div css={appStyle}>
      <header>
        <a href="https://athenian.co" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="athenian-logo" />
        </a>{" "}
        <h1> Athenian WebApp Tech Assessment </h1>{" "}
      </header>{" "}
      <div className="body">
        <SelectMetrics> </SelectMetrics>{" "}
        <div className="daterange">
          <RangePicker onChange={onChange} />{" "}
        </div>{" "}
        <div className="insights">
          <h2> Insights </h2>{" "}
          <Tabs>
            <Box> </Box>{" "}
          </Tabs>{" "}
          <div className="control"></div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

const appStyle = () => {
  return css`
    width: 100%;
    text-align: center;
    background: whitesmoke;
    padding: 50px 0;

    & button {
      background: #ff6c37;
      cursor: pointer;
    }

    & div.daterange {
      margin-top: 30px;
    }

    & div.insights {
      margin: 50px auto;
      padding: 30px 0;
      width: 90%;
      border: 3px black solid;
    }
  `;
};

export default App;

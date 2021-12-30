import React, { useState, useEffect, useContext } from "react";
import metricsContext from "../context/metrics/metrics-context";
import appContext from "../context/app/app-context";
import { css } from "@emotion/react";
import Chart from "./chart";

const Box = () => {
  const { metrics, setMetrics, activeData, activeMetric, activeRepoData } =
    useContext(metricsContext);

  const { filterDate } =
    useContext(appContext);

  const [average, setAverage] = useState();
  const [averageRepo, setAverageRepo] = useState();
  const [canRender, setCanRender] = useState(false);


  useEffect(() => {
    if (metrics.length > 0 && !!filterDate[0] && !!filterDate[1]) {
      setCanRender(true);
    }    
  }, [filterDate,metrics]);


  useEffect(() => {
    let sum = 0;
    for (const data of activeData) {
      sum += data.value;
    }
    setAverage(sum / activeData.length);
  }, [activeData]);

  useEffect(() => {
    let sum = 0;
    for (const data of activeRepoData) {
      sum += data.avg;
    }
    setAverageRepo(sum / activeRepoData.length);
  }, [activeRepoData]);

  const closeActive = () => {
    const metricsCopy = [...metrics];
    const match = metricsCopy.find(
      (metric) => metric.label === activeMetric.label
    );
    if (match) {
      const index = metricsCopy.indexOf(match);
      if (index > -1) {
        metricsCopy.splice(index, 1);
      }
    }
    setMetrics([...metricsCopy]);
    localStorage.setItem('metrics', JSON.stringify(metricsCopy));
  };


  return (
    <>
      {canRender ? (
        <div css={boxStyle}>
          <button onClick={closeActive}>X</button>
          <h3>Insights for metric {activeMetric?.label} </h3>
          <div css={chartStyle}>
            <Chart
              chartType={"line"}
              chartData={activeData}
              avg={average}
            ></Chart>
            <Chart
              chartType={"bar"}
              chartData={activeRepoData}
              avg={averageRepo}
            ></Chart>
          </div>
          <div css={kpiStyle}>
            <div>
              <span>average:</span> {average}
            </div>
            <div>
              <span>AVG. per repo:</span> {averageRepo}
            </div>
          </div>
        </div>
      ) : (
        <h3>add a metric and select date range to get started {filterDate[0]}</h3>
      )}
    </>
  );
};

const boxStyle = () => {
  return css`
    width: 90%;
    position: relative;
    display: block;
    margin: 0px auto;
    text-align: center;
    border: 3px black solid;

    & img.chart {
      width: 45%;
      height: 200px;
      margin: 5px 5px;
    }

    & img.kpi {
      width: 45%;
      height: 50px;
      margin: 5px 5px;
    }
  `;
};

const chartStyle = () => {
  return css`
    width: 100%;
    padding: 20px;
    position: relative;
    display: flex;
    flex-wrap: no-wrap;
    justify-content: space-between;
    margin: 5px 5px;
  `;
};

const kpiStyle = () => {
  return css`
    width: 100%;
    padding: 20px;
    position: relative;
    display: flex;
    flex-wrap: no-wrap;
    justify-content: center;
    margin: 5px 5px;
    & div {
      border: 1px solid grey;
      background: white;
      padding: 10px;
      margin: 10px;
      min-width: 250px;
      display: flex;
      justify-content: space-between;
    }
  `;
};

export default Box;

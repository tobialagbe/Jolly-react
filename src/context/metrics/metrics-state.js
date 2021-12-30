import React, { useState } from "react";
import MetricsContext from "./metrics-context";

const MetricsState = (props) => {
  const [metrics, setMetrics] = useState([]);
  const [metricsData, setMetricsData] = useState();
  const [activeData, setActiveData] = useState([]);
  const [activeRepoData, setActiveRepoData] = useState([]);

  const defaultMetric = {
    label: "null",
    active: true,
  };

  const [activeMetric, setActiveMetric] = useState(defaultMetric);
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);

  return (
    <MetricsContext.Provider
      value={{
        metrics,
        setMetrics,
        metricsData,
        setMetricsData,
        activeData,
        setActiveData,
        activeRepoData,
        setActiveRepoData,
        activeMetric,
        setActiveMetric,
        activeMetricIndex,
        setActiveMetricIndex,
      }}
    >
      {props.children}
    </MetricsContext.Provider>
  );
};

export default MetricsState;

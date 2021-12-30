import React, { useContext } from "react";
import metricsContext from "../context/metrics/metrics-context";

const Tab = ({ metric }) => {
  const { metrics, setMetrics, activeData } = useContext(metricsContext);

  const selectMetric = (m) => {
    const metricsCopy = [...metrics];
    metricsCopy.forEach((metric) => {
      metric.active = false;
      if (metric.label === m.label) metric.active = true;
    });
    setMetrics(metricsCopy);
    localStorage.setItem('metrics', JSON.stringify(metricsCopy));
  };

  return <button onClick={() => selectMetric(metric)}>{metric.label}</button>;
};

export default Tab;

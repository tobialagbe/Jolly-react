import React, { useContext } from "react";
import metricsContext from "../context/metrics/metrics-context";
import { allMetrics } from "../util/constants";
import { Select } from "antd";
const { Option } = Select;

const SelectMetrics = () => {
  const { metrics, setMetrics } = useContext(metricsContext);

  function handleChange(value) {
    addMetric({
      label: value,
      active: false,
    });
  }

  const addMetric = (newMetric) => {
    if (metrics.find((metric) => metric.label === newMetric.label))
      return false;
    setMetrics((prevMetrics) => [...prevMetrics, newMetric]);
    localStorage.setItem('metrics', JSON.stringify([...metrics, newMetric]));
  };

  return (
    <>
      <Select
        // mode="multiple"
        allowClear
        style={{ width: "60%" }}
        placeholder="Add a metric"
        onChange={handleChange}
      >
        {allMetrics.map((m, i) => (
          <Option key={i} value={m}>
            {" "}
            {m}{" "}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectMetrics;

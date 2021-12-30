import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ chartType, chartData, avg }) {
  const cdata = chartData?.map((cd) => {
    return { date: cd.date, value: cd.value, average: avg };
  });

  const lineChart = (
    <ResponsiveContainer width={"100%"} height={250}>
      <LineChart
        width={"45%"}
        height={300}
        data={cdata}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Line type="monotone" dataKey="average" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );

  const barChart = (
    <ResponsiveContainer width={"100%"} height={250}>
      <BarChart width={"45%"} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="repo" label={{ angle: -60, position: "insideLeft" }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="avg" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );

  const chartToRender = chartType === "line" ? lineChart : barChart;

  return chartToRender;
}

export default Chart;

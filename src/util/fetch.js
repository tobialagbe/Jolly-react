import moment from "moment";

const Fetcher = async (url = "", metrics = [], filterDate = []) => {
  const data = {
    for: [
      {
        repositories: [
          "github.com/athenianco/athenian-api",
          "github.com/athenianco/athenian-webapp",
          "github.com/athenianco/infrastructure",
          "github.com/athenianco/metadata",
        ],
        repogroups: [[0], [1], [2], [3]],
      },
    ],
    metrics: metrics.map((m) => m.label),
    date_from: filterDate[0] || moment().format().split("T")[0],
    date_to: filterDate[1] || moment().format().split("T")[0],
    granularities: ["day"],
    exclude_inactive: true,
    account: 1,
    timezone: 60,
  };

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
};

export default Fetcher;

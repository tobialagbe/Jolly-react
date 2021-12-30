const apiUrl = 'https://api.athenian.co/v1/metrics/pull_requests';
const allMetrics = [`pr-wip-time`,`pr-wip-count`,`pr-review-time`,`pr-review-count`,`pr-merging-time`,`pr-merging-count`,`pr-release-time`,`pr-release-count`,`pr-lead-time`,`pr-lead-count`,`pr-cycle-time`,`pr-cycle-count`,`pr-opened`,`pr-reviewed`,`pr-not-reviewed`,`pr-merged`,`pr-rejected`,`pr-closed`,`pr-done`];
const repos = ["github.com/athenianco/athenian-api",
"github.com/athenianco/athenian-webapp",
"github.com/athenianco/infrastructure",
"github.com/athenianco/metadata"];

export {
    apiUrl,
    allMetrics,
    repos
}
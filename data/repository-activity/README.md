# Repo 月度开发活动

数据快照截至 **2026-11-01 00:11:49（Asia/Shanghai）**。目录包含 901 个条目，
其中 860 个条目的主链接指向 GitHub，共 858 个规范化仓库 URL。
成功取得 836 个仓库的元数据，
其中 836 个仓库取得完整默认分支历史，0 个仓库为空。
另有 22 个仓库不可访问，REST 已复核为 HTTP 404，不计为零提交仓库。

原始月度序列覆盖 2012-09 至 2026-11，空月补零，当月标记为未结束。
共计 386,488 次提交；网站分类图表从 2024-01 开始，合计见 `category-summary.json`。
提交按 committer 时间归入上海时区，包含合并、机器人及 fork 继承历史。
同一个提交出现在不同仓库时分别计数。仓库创建时间来自 GitHub `createdAt`，不代表目录收录时间。
同一 GitHub 仓库 ID 只统计一次，分类按其在目录中的首个条目确定。

`snapshot.json` 固定 GitHub 元数据和默认分支 HEAD；`repositories.json` 保存逐仓库计数；
`monthly.json` / `monthly.csv` 为全时段汇总；`category-monthly.json` / `.csv` 为分类汇总；
`unavailable.json` 保存不可访问仓库的复核结果。每个成功仓库的提交条数均与固定 HEAD 的
GitHub GraphQL `history.totalCount` 校验。网络、权限及历史不完整错误会使更新失败，保留断点后重试。

每月首次发布巡检自动重新采集、分类并生成八种语言图表，再校验和上线。入口为
`npm run maintain:publication`；使用 `-- --refresh-activity` 可强制刷新。
失败重试沿用同一快照和缓存，避免重复下载已完成历史。
独立采集：`python3 scripts/collect_repository_activity.py --refresh`；断点续跑时省略 `--refresh`。

统计范围为本目录收录的相关仓库，不代表整个 AI 行业的开发趋势。
来源：[GitHub Repository](https://docs.github.com/en/graphql/reference/objects#repository)、
[git log](https://git-scm.com/docs/git-log)。

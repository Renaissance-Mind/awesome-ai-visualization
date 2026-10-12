# Repo 月度开发活动

数据快照截至 **2026-10-13 01:35:29（Asia/Shanghai）**。目录包含 893 个条目，其中 852 个条目的主链接指向 GitHub；规范化并去重后，共 850 个 repo。成功取得 833 个 repo 的完整默认分支历史和创建时间，其余 17 个 repo 的 GraphQL 查询无法解析，REST 接口复核均返回 HTTP 404。41 个主链接不指向 GitHub 的条目不计入 repo 统计。

两条月度序列采用同一时间范围：**2012-09 至 2026-10，共 170 个月**。空月补零；2026-10 尚未结束，折线末尾使用虚线。

| 度量 | 口径 | 总数 |
| --- | --- | ---: |
| 每月 commit 数 | 对每个 repo，遍历元数据快照固定的默认分支 HEAD 所有可达提交，按 committer 时间归入上海时区的月份 | 337,840 |
| 每月新建 repo 数 | 按 GitHub `createdAt` 归入上海时区的月份，每个 repo ID 计一次 | 833 |

commit 包含合并提交、机器人提交和 5 个 fork 的继承历史；相同 commit 出现在不同 repo 时，分别计入各自仓库。其他分支上尚未合并、默认分支已无法追溯的提交不在统计范围内。repo 创建时间代表 GitHub 仓库创建时间，不代表项目最早开发时间或本目录收录时间。主链接指向技能文件或仓库子目录时，commit 统计仍覆盖整个宿主 repo。

833 个 repo 的本地提交条数分别与固定 HEAD 的 GitHub GraphQL `history.totalCount` 完全一致。另对 Paper2Any、Lightdash、Mermaid 使用 ISO 时间字段独立复算月度计数，与结果一致。各仓库计数、月份汇总和 CSV 总数均已核对。17 个无法访问的 repo 保留在覆盖清单中，未当作零提交仓库。

| 文件 | 内容 |
| --- | --- |
| `monthly.csv` / `monthly.json` | 两条折线的逐月数据，含当月未结束标记 |
| `summary.json` | 快照时间、目录指纹、总量、覆盖范围、计数定义 |
| `snapshot.json` | GitHub 元数据、固定 HEAD、目录条目与 repo 的对应关系 |
| `repositories.json` | 每个 repo 的实际提交数和月度计数，含无法访问状态 |
| `unavailable.json` | 17 个无法访问的 repo 及 REST 复核状态 |

重新采集需要已登录的 GitHub CLI、Git，以及安装 PyYAML 的 Python。commit 对象缓存位于忽略提交的 `.cache/repository-activity/`；过滤下载不包含源码树和文件内容。中断后执行相同命令会沿用固定快照、复用已完成仓库；使用 `--refresh` 开始新快照。

```bash
python3 scripts/collect_repository_activity.py --workers 8
python3 scripts/collect_repository_activity.py --workers 8 --refresh
python3 scripts/render_repository_activity.py /absolute/output/repo-monthly-activity.html
```

数据字段与 Git 行为参见 [GitHub Repository 对象](https://docs.github.com/en/graphql/reference/objects#repository)、[Git log 文档](https://git-scm.com/docs/git-log)、[Git clone 过滤说明](https://git-scm.com/docs/git-clone)。GitHub 的统计图接口会排除部分提交，故此处采用固定 HEAD 的原始 Git 历史；参见 [GitHub 仓库统计接口说明](https://docs.github.com/en/rest/metrics/statistics)。

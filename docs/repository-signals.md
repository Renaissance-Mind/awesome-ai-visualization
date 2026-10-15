# GitHub 活跃度采集与标签

`scripts/collect_repository_signals.py` 通过 GitHub GraphQL API 采集目录中主链接指向 GitHub 的项目，无需克隆仓库或调用模型。已有的 `collect_repository_activity.py` 保留完整提交历史的月度分析；本流程适合每日采集和项目筛选。

每个项目记录 Star、fork、归档状态、默认分支 HEAD、近 7/30/60/90 天提交数，以及近 90 天内最多 10 条提交记录（SHA、时间、标题、链接）。仓库重命名或多个目录项指向同一仓库时，以 GitHub repository ID 去重并保留别名。不可访问的仓库标记为“数据暂不可用”。

## 标签规则

| 标签 | 条件 |
| --- | --- |
| 已归档 | GitHub 的 `isArchived` 为 true |
| 默认分支无提交 | 没有默认分支 |
| 近7天更新 / 近30天更新 / 近90天更新 | 取最近一个有提交的窗口，三者互斥 |
| 近90天无提交 | 默认分支近90天提交数为0 |
| 持续维护 | 最近三个连续30天窗口，每个窗口至少2次提交，且未归档 |
| Star周增长 / Star月增长 | 对比基线，Star净增加至少10，且至少达到基线的5% |
| Star周快速增长 | Star净增加至少50，且至少达到周基线的20% |
| 数据暂不可用 | 本次无法取得完整指标，不推断维护状态 |

“持续维护”只表示提交频率达到上述规则，不代表项目质量、人工维护或可用性。提交统计覆盖本次默认分支 HEAD 可达的历史，包含 merge、bot 和 fork 继承的提交；按 committer 时间计算，截至本次采集起点。HEAD 的时间单独保存，不当作整个仓库最近一次开发活动。

Star 是 GitHub 收藏数。增长使用定期快照的净差值，包含取消 Star 的影响，不是新增收藏事件数。周基线允许6–8天，月基线允许28–32天，选取最接近目标天数的一次观测；实际间隔和基线时间随结果保存。缺少合适基线时增长为 `null`，不会生成增长标签。首次采集只能给出当前热度和提交活跃度。

## 运行与输出

需要 Python 3、PyYAML、GitHub CLI 和已授权的 GitHub 身份：

```sh
python3 -m pip install PyYAML
gh auth login
python3 scripts/collect_repository_signals.py
```

输出写入 `data/repository-signals/`：

- `latest.json`：完整指标、提交记录、标签及标签中文名。
- `summary.json`：采集覆盖率、标签分布、增长指标的基线覆盖率。
- `history/YYYY-MM-DD.json`：每天的精简 Star/fork 基线，以 UTC 日期命名。同一天重跑保留每个仓库首次成功观测，并补齐此前失败的仓库。

身份、限额或整个请求出错时采集失败，保留已发布快照；单个仓库不可访问时保留错误说明。`cutoff` 是提交窗口的共同截止时间，`observed_at` 是每批请求完成的时间，整个目录的 Star 数并非同一瞬间的读数。

局部试跑需要独立输出目录，以避免覆盖全量结果：

```sh
python3 scripts/collect_repository_signals.py \
  --repo Vincentwei1021/video-shotcraft \
  --output .cache/repository-signals-demo
```

## 自动运行

`.github/workflows/repository-signals.yml` 提供 GitHub Actions 每日采集，时间为北京时间08:23，也可手动触发。工作流需要进入远程默认分支且 Actions 启用后才会执行；GitHub 的定时任务可能延迟。

采集和推送各最多尝试三次。每小时发布巡检也会检查最近运行，失败时最多补充两次失败任务重跑，并在巡检聊天报告失败与恢复。

工作流使用内置 `GITHUB_TOKEN` 读取公开项目、上传采集文件为 artifact，并提交数据变化。若默认分支禁止机器人直接推送，自动提交步骤会明确失败；artifact 仍可下载。

## 网站展示

网站通过 `/api/repository-signals` 读取远程默认分支的 `latest.json`，在 Cloudflare 边缘缓存15分钟。采集机器人提交成功后，新数据会自动进入网站，无需重新部署前端。构建时另存 `public/repository-signals.json` 作为备用快照。前端每10分钟重新读取一次，优先采用截止时间较新的完整快照。

按目录主链接的 GitHub 仓库名匹配 `catalog_aliases`，用途信息保持独立。列表展示采集时 Star、近30天提交数、有基线时的周增长；详情提供7/30天增长、最近提交、观测日期和最多30个观测日的 Star 趋势。周/月基线缺失时显示“正在积累数据”。

网站标签规则：HOT 要求未归档、6–8天基线至少100 Star、净增至少100且增幅至少5%；Popular 要求未归档且当前至少5,000 Star。持续维护和近期更新沿用上面的提交规则。列表最多显示两个标签，HOT 优先于 Popular，持续维护优先于近期更新；已归档独立展示。原始采集 `tags` 保留原有指标标签，网站根据原始数值计算这些展示标签。

观测超过72小时，停止动态标签匹配并标明历史快照。无法采集的仓库展示“暂未获取动态”，不当作零提交。当前 Star 排序使用已采集值；周增长和30天提交数排序要求观测仍在72小时内，未知指标排在已知指标后。负增长仍保留为负数。搜索默认保留语义相关性，用户可主动切换排序；动态筛选在检索结果上继续筛选。

接口依据：[GitHub GraphQL reference](https://docs.github.com/en/graphql/reference)、[GitHub Actions schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)。

# 自動部署設定

這個專案已加入 GitHub Actions 自動部署流程：

- workflow: `.github/workflows/vercel-deploy.yml`
- 觸發時機：推送到 `main` 分支，或在 GitHub Actions 手動執行
- 部署目標：Vercel production

## GitHub Secrets

到 GitHub repo 的 `Settings` -> `Secrets and variables` -> `Actions` 新增：

| Secret | 說明 |
| --- | --- |
| `VERCEL_TOKEN` | Vercel Account Settings 裡建立的 token |
| `VERCEL_ORG_ID` | Vercel 專案所屬 team/user id |
| `VERCEL_PROJECT_ID` | Vercel 專案 id |

## 取得 Vercel ID

在本機登入並連結專案後可取得：

```bash
vercel login
vercel link
```

完成後 `.vercel/project.json` 會包含：

```json
{
  "orgId": "...",
  "projectId": "..."
}
```

把這兩個值分別填入 GitHub Secrets。

## 日常流程

```bash
git add .
git commit -m "Update site"
git push
```

推送後 GitHub Actions 會自動安裝依賴、建置並重新部署網站。

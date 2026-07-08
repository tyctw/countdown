# GitHub Pages 自動部署

這個專案使用 GitHub Actions 直接部署到 GitHub Pages。

- workflow: `.github/workflows/pages-deploy.yml`
- 觸發時機：推送到 `main` 分支，或在 GitHub Actions 手動執行
- 部署網址：`https://tyctw.github.io/countdown/`

## 第一次啟用

到 GitHub repo：

1. 進入 `Settings` -> `Pages`
2. `Build and deployment` 的 `Source` 選 `GitHub Actions`
3. 儲存後，之後推送到 `main` 就會自動重新部署

不需要設定 Vercel token 或 GitHub secrets。

## 日常流程

```bash
git add .
git commit -m "Update site"
git push
```

推送後 GitHub Actions 會自動安裝依賴、建置 `dist`，並部署到 GitHub Pages。

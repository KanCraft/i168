# 開発手順

```sh
% npm install
% npm start
```

# リリース手順

- `app.json`の`version`を更新
- `npm run build-ios`して`ipa`ファイルを入手
- `Application Loader`でbuildした`ipa`をアップロード
  - この際、App Specific Password を https://appleid.apple.com/account/manage で作成する必要があるかも
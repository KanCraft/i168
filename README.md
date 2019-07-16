
![screens](https://raw.githubusercontent.com/otiai10/i168/master/screens.jpeg)

![i168](https://raw.githubusercontent.com/otiai10/i168/master/i168.png)

# TestFlightを使った公開

1. `npm run build:ios` -> `.ipa` file を得る
2. Application Loaderを使い、App Storeへアップロードする
3. テスト用のReviewが終わる
4. Reviewが通れば、`輸出コンプライアンス`を設定し、Connectユーザがテストできるようになる
5. `外部ユーザ`がテストできるために、`ベータ版 App Review`を通す
    - ビルドバージョン詳細画面に行き、外部ユーザ or グループを追加する
    - 自動的に`ベータ版 App Review`に提出され、ステータスが`審査待ち`となる

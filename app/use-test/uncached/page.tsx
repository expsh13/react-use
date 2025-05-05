"use client";

import { Suspense, use, useState } from "react";
import Link from "next/link";

// キャッシュされていないPromiseを使用するコンポーネント
// このコンポーネントはレンダリングごとに新しいPromiseを作成するため、問題が発生する
function UncachedPromiseComponent() {
  // これは問題のあるコード - レンダリングごとに新しいPromiseが作成される
  const data = use(fetch("/api/data?id=uncached").then((res) => res.json()));

  // レンダリングが発生したことをログに表示
  console.log("UncachedPromiseComponent rendered:", data);

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">キャッシュされていないPromise</h2>
      <div>Message: {data.message}</div>
      <div>Timestamp: {data.timestamp}</div>
    </div>
  );
}

export default function UncachedTestPage() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        キャッシュされていないPromiseのテスト
      </h1>
      <p className="mb-4">
        このページでは、キャッシュされていないPromiseを使用した場合、
        コンポーネントが無限ループやエラーを引き起こすかを検証します。
        <br />
        これは、async と await は await
        が呼び出された地点からレンダーを再開しますが、use
        はデータが解決した後にコンポーネントを最初からレンダーするため無限レンダリングが起こります。。
      </p>

      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowComponent(!showComponent)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showComponent ? "コンポーネントを非表示" : "コンポーネントを表示"}
        </button>
      </div>

      {showComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <UncachedPromiseComponent />
        </Suspense>
      )}

      <div className="mt-8">
        <Link href="/" className="text-blue-500 underline">
          検証メニューに戻る
        </Link>
      </div>
    </div>
  );
}

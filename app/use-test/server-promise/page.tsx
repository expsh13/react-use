// サーバーコンポーネント
import { Suspense } from "react";
import Link from "next/link";
import Component from "./component";

// サーバーからPromiseを作成
function createServerPromise(id: string) {
  return fetch(`http://localhost:3000/api/data?id=${id}`, {
    cache: "no-store",
  }).then((res) => res.json());
}

export default function ServerPromisePage() {
  // サーバーコンポーネントでPromiseを作成
  const dataPromise1 = createServerPromise("server1");
  const dataPromise2 = createServerPromise("server2");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        サーバーコンポーネントからのPromiseテスト
      </h1>
      <p className="mb-4">
        このページでは、サーバーコンポーネントで作成されたPromiseを
        クライアントコンポーネントに渡し、正常に動作するかを検証します。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Suspense
          fallback={
            <div className="p-4 border rounded">データ1を読み込み中...</div>
          }
        >
          <Component promise={dataPromise1} label="データセット1" />
        </Suspense>

        <Suspense
          fallback={
            <div className="p-4 border rounded">データ2を読み込み中...</div>
          }
        >
          <Component promise={dataPromise2} label="データセット2" />
        </Suspense>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 underline">
          検証メニューに戻る
        </Link>
      </div>
    </div>
  );
}

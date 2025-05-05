"use client";

import { useState } from "react";
import Link from "next/link";
import CachedPromiseComponent from "./cached-component";
import CachedPromiseComponent2 from "./cached-component2";

export default function ClientCachedPage() {
  const [showComponents, setShowComponents] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        クライアントでキャッシュされたPromiseのテスト
      </h1>
      <p className="mb-4">
        このページでは、クライアントコンポーネントでキャッシュされたPromiseを使用し、
        正常に動作するかを検証します。クライアントコンポーネントの外部で定義されたPromiseは、
        レンダリング間で再利用されます。
      </p>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setShowComponents(!showComponents)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showComponents ? "コンポーネントを非表示" : "コンポーネントを表示"}
        </button>

        <button
          type="button"
          onClick={() => setResetCounter((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          テストをリセット
        </button>
      </div>

      {showComponents && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <CachedPromiseComponent
            id="client1"
            label="キャッシュ付きコンポーネント1"
            key={`client1-${resetCounter}`}
          />
          <CachedPromiseComponent2 key={`client2-${resetCounter}`} />
        </div>
      )}

      <div className="mt-8">
        <Link href="/" className="text-blue-500 underline">
          検証メニューに戻る
        </Link>
      </div>
    </div>
  );
}

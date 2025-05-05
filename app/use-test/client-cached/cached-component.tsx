"use client";

import { use, useState } from "react";

interface DataResponse {
  id: string;
  message: string;
  timestamp: string;
}

function fetchData(id: string): Promise<DataResponse> {
  // キャッシュされる Promise を返す
  return fetch(`/api/data?id=${id}`).then((res) => res.json());
}

// 一度だけ作成されるPromiseをメモ化
const dataPromise = fetchData("1");

interface CachedPromiseComponentProps {
  id: string;
  label: string;
}

export default function CachedPromiseComponent({
  label,
}: CachedPromiseComponentProps) {
  const [counter, setCounter] = useState(0);

  // コンポーネントの外部で定義された関数を使ってキャッシュされたPromiseを取得
  const data = use(dataPromise);

  // レンダリングが発生したことをログに表示
  console.log(`CachedPromiseComponent (${label}) rendered:`, data);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">{label}</h2>
      <div className="mb-2">
        <button
          type="button"
          onClick={() => setCounter((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          クリックして再レンダリング: {counter}
        </button>
      </div>
      <div>ID: {data.id}</div>
      <div>Message: {data.message}</div>
      <div>APIレスポンスのタイムスタンプ: {data.timestamp}</div>
      <div className="mt-2 text-green-600">
        ✓
        このコンポーネントは正常に動作しています。再レンダリングしても同じAPIレスポンスが表示されます。
      </div>
    </div>
  );
}

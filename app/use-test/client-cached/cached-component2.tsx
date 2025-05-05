"use client";

import { Suspense, use, useState } from "react";

interface DataResponse {
  id: string;
  message: string;
  timestamp: string;
}

function fetchData(id: string): Promise<DataResponse> {
  // キャッシュされる Promise を返す
  return fetch(`/api/data?id=${id}`).then((res) => res.json());
}

export default function CachedPromiseComponent2() {
  const [dataPromise] = useState(() => fetchData("2"));

  return (
    <Suspense fallback={<div className="p-4 border rounded">Loading...</div>}>
      <ChildComponent dataPromise={dataPromise} />
    </Suspense>
  );
}

const ChildComponent = ({
  dataPromise,
}: {
  dataPromise: Promise<DataResponse>;
}) => {
  const data = use(dataPromise);
  return (
    <div className="p-4 border rounded">
      <div>ID: {data.id}</div>
      <div>Message: {data.message}</div>
      <div>APIレスポンスのタイムスタンプ: {data.timestamp}</div>
      <div className="mt-2 text-green-600">
        ✓
        このコンポーネントは正常に動作しています。再レンダリングしても同じAPIレスポンスが表示されます。
      </div>
    </div>
  );
};

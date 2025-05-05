import { use } from "react";

interface DataResponse {
  id: string;
  message: string;
  timestamp: string;
}

interface ServerProvidedPromiseClientProps {
  promise: Promise<DataResponse>;
  label: string;
}

export default function ServerProvidedPromiseClient({
  promise,
  label,
}: ServerProvidedPromiseClientProps) {
  // サーバーから受け取ったPromiseをuseフックで利用
  const data = use(promise);

  // レンダリングが発生したことをログに表示
  console.log(`ServerProvidedPromiseClient (${label}) rendered:`, data);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">{label}</h2>
      <div>ID: {data.id}</div>
      <div>Message: {data.message}</div>
      <div>Timestamp: {data.timestamp}</div>
      <div className="mt-2 text-green-600">
        ✓
        このコンポーネントは正常に動作しています。再レンダリングしても同じデータが表示されます。
      </div>
    </div>
  );
}

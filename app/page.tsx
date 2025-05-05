import Link from "next/link";

export default function UseTestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        React use()フックとPromiseキャッシング検証
      </h1>

      <div className="mb-8">
        <p className="mb-4">
          このページでは、Reactの<code>use()</code>
          フックとPromiseキャッシングに関する 3つの検証を行うことができます。
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>キャッシュされていないPromise</strong>:
            コンポーネント内で毎回新しいPromiseを作成すると、無限ループやエラーが発生する可能性を検証します。
          </li>
          <li>
            <strong>サーバーコンポーネントからのPromise</strong>:
            サーバーコンポーネントで作成されたPromiseをクライアントコンポーネントに渡すと、
            正常に動作することを検証します。
          </li>
          <li>
            <strong>クライアントでキャッシュされたPromise</strong>:
            クライアントコンポーネントの外部でPromiseをキャッシュすると、
            正常に動作することを検証します。
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-bold mb-2">
            1. キャッシュされていないPromise
          </h2>
          <p className="mb-4">
            コンポーネント内で直接新しいPromiseを作成すると、レンダリングのたびに
            新しいPromiseが作成され、問題が発生します。
          </p>
          <Link
            href="/use-test/uncached"
            className="block px-4 py-2 bg-red-500 text-white rounded text-center"
          >
            テストを実行
          </Link>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-bold mb-2">
            2. サーバーコンポーネントからのPromise
          </h2>
          <p className="mb-4">
            サーバーコンポーネントでPromiseを作成し、クライアントコンポーネントに
            渡すと、安定して動作します。
          </p>
          <Link
            href="/use-test/server-promise"
            className="block px-4 py-2 bg-green-500 text-white rounded text-center"
          >
            テストを実行
          </Link>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-bold mb-2">
            3. クライアントでキャッシュされたPromise
          </h2>
          <p className="mb-4">
            クライアントコンポーネントの外部でPromiseをキャッシュすると、
            コンポーネント内で直接作成するよりも安定して動作します。
          </p>
          <Link
            href="/use-test/client-cached"
            className="block px-4 py-2 bg-blue-500 text-white rounded text-center"
          >
            テストを実行
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 underline">
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}

import { NextResponse } from 'next/server';

// 意図的に遅延を加える関数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: Request) {
  // URLからIDパラメータを取得
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || 'default';
  
  // 意図的に遅延を加える（検証しやすいように）
  await delay(500);
  
  // 現在のタイムスタンプを含めたデータを返す
  return NextResponse.json({
    id,
    message: `データが正常に取得されました。ID: ${id}`,
    timestamp: new Date().toISOString(),
  });
}

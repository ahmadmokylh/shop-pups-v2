import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <main className=" w-full h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">الصفحة غير موجودة</h1>

      <Link to="/">الرئيسية</Link>
    </main>
  )
}

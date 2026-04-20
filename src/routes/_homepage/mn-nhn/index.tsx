import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homepage/mn-nhn/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen">
      <div className="w-full flex flex-col  py-10 gap-3 ">
        <h1 className="text-3xl mx-auto">من نحن</h1>
        <p className="bg-amber-400 w-fit">
          من قلب الكويت جيناكم بأعسال طبيعية مكفولة من إنتاج مناحلنا أو مستورده
          من أجود الأعسال في العالم ، حاصليين أعسالنا على مراكز عالمية بمسابقة
          لندن السنوية لجودة الأعسال ، مضمون، ويفيد صحتكم
        </p>
      </div>
    </main>
  )
}

interface HeaderPageProps {
  pageTitle: string
  children: React.ReactNode
}

export default function HeaderPage({ pageTitle, children }: HeaderPageProps) {
  return (
    <div className="flex flex-col mt-15 mb-10 gap-6">
      <h1 className="text-xl sm:text-4xl">{pageTitle}</h1>

      {children}
    </div>
  )
}

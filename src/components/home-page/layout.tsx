type LayoutPros = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutPros) {
  return <div className=" w-full px-12">{children}</div>
}

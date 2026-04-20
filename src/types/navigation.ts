export interface NavigationLink {
  items: {
    title: string
    to: string
  }[]

  subItems: {
    title: string
    to: string
  }[]
}

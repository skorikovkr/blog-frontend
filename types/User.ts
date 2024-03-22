export interface User {
  id: number,
  name: string,
  email: string,
  roles: {
    name: string
  }[]
}
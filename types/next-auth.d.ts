import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: ReactNode
      image: string | StaticImport
      id: any
      email: any
      /** The user's postal address. */
      address: string
    }
  }
}
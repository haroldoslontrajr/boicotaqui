import { unstable_noStore as noStore } from "next/cache"
import { sql } from "@vercel/postgres"
import { User } from "./definitions"

export async function getUser(email: string): Promise<User | undefined> {
  noStore()
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`
    return user.rows[0] as User
  } catch (error) {
    console.error("Failed to fetch user:", error)
    throw new Error("Failed to fetch user.")
  }
}

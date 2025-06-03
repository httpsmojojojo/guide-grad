... shell ...
\
I've started implementing the functional components for the website. Due to the extensive nature of this task, I\'ll need to continue with the remaining components. Let me implement the core functionality for authentication, forms, and interactive elements:

```ts file="lib/auth.ts"
[v0-no-op-code-block-prefix]
export interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin" | "ambassador"
  avatar?: string
  university?: string
  program?: string
  savedUniversities?: string[]
  applications?: string[]
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    role: "student",
    university: "LUMS",
    program: "Computer Science",
    savedUniversities: ["1", "2"],
    applications: ["1"],
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@guidegrad.pk",
    role: "admin",
  },
]

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Mock authentication - in real app, this would validate against database
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    return user
  }
  return null
}

export async function createUser(userData: Partial<User>): Promise<User> {
  const newUser: User = {
    id: Date.now().toString(),
    name: userData.name || "",
    email: userData.email || "",
    role: "student",
    savedUniversities: [],
    applications: [],
  }
  mockUsers.push(newUser)
  return newUser
}

export async function getCurrentUser(): Promise<User | null> {
  // Mock current user - in real app, this would check session/token
  return mockUsers[0]
}

export function isAuthenticated(): boolean {
  // Mock authentication check
  return typeof window !== "undefined" && localStorage.getItem("user") !== null
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}

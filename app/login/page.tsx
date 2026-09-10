"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { editorial } from "@/lib/fonts"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setLoading(false)
      router.push("/dashboard")
    }
  }

  return (
    <main className="fs-page fs-grid-bg">
      <section className="fs-container grid min-h-[calc(100vh-4rem)] place-items-center py-16">
        <div className="fs-card w-full max-w-md p-6 sm:p-8">
          <p className="fs-eyebrow mb-5">Lorem</p>
          <h1 className={`${editorial.className} mb-4 text-5xl font-semibold leading-none tracking-[-0.055em] text-[var(--fs-text)]`}>
            Log in
          </h1>
          <p className="mb-8 text-sm leading-7 text-[var(--fs-muted)]">
            Sample Text
          </p>

          {error && <div className="mb-5 border border-red-300/20 bg-red-300/5 px-4 py-3 text-sm text-red-100">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="fs-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fs-input"
              required
            />
            <button type="submit" disabled={loading} className="fs-button-primary w-full disabled:pointer-events-none disabled:opacity-50">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

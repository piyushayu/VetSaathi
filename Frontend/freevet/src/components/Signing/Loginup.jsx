import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ReactLogo from "../../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/services/Slice";

import { loginUser } from "@/lib/auth";

function Loginimage() {
  return (
    <div className=" hidden md:flex  items-center justify-center bg-purple-500 h-full">
        <img src={ReactLogo} className="h-20 w-20 object-contain" alt="React logo" />
      </div>
  )
}

function Loginform() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await loginUser(email, password)

      if (error) {
        setError(error.message)
      } else {
        dispatch(login({ userData: { email } }))
        navigate("/profile")
      }
    } catch (err) {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent p-6 md:p-8 flex flex-col justify-center">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">Login to your account</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Enter your email below to Login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="m@example.com"
                required
                className="h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="login-password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-xs text-muted-foreground underline-offset-4 hover:underline "
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="login-password"
                type="password"
                required
                className="h-10"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button type="submit" className="w-full h-10 font-medium" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 font-medium flex items-center justify-center gap-2"
            >
              Login with Google
            </Button>

            <div className="flex flex-row items-center justify-center text-xs text-muted-foreground mt-2">
              <span>Don't have any account?</span>
              <CardAction className="inline ml-1">
                <Link to="/signup"><Button variant="link" className="p-0 mb-0.5 text-primary underline-offset-4 hover:underline">
                  Signup
                </Button></Link>
              </CardAction>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Logincomponent() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-4 md:p-8">
      {/* Unified Split Container */}
      <div className=" w-full max-w-5xl grid md:grid-cols-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden items-stretch">
        <Loginimage />
        <Loginform />
      </div>
    </div>
  )
}

export default Logincomponent;
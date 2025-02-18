import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react'
import { cn } from '@/lib/utils'
import { withLayout } from '@/template'

const Login = () => {
  const ref = React.useRef<HTMLFormElement | null>(null)

  const handleValidate = () => {
    if (ref.current?.reportValidity()) {
      console.log('Form is valid')
    } else {
      console.log('Form is invalid')
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 bg-background")} >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your email ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={ref}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter a valid email address')}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Please enter your password')}
                  />
                </div>
                <Button type="button" onClick={handleValidate} className="w-full">
                  Validate
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default withLayout(Login)
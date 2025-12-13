'use client'

import { useState, useTransition } from 'react'
import { requestPasswordReset, resetPasswordWithCode } from '@/app/settings/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ForgotPasswordForm({
  defaultEmail
}: {
  defaultEmail?: string
}) {
  const [email, setEmail] = useState(defaultEmail ?? '')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleRequestCode = () => {
    startTransition(async () => {
      const response = await requestPasswordReset(email)
      if (response?.type === 'success') {
        toast.success(response.message)
        if (response.code) {
          toast.message('Reset code (development only)', {
            description: response.code
          })
          setCode(response.code)
        }
      } else if (response?.message) {
        toast.error(response.message)
      }
    })
  }

  const handleResetPassword = () => {
    startTransition(async () => {
      const response = await resetPasswordWithCode(email, code, newPassword)
      if (response?.type === 'success') {
        toast.success(response.message)
      } else if (response?.message) {
        toast.error(response.message)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Account email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          disabled={isPending}
          required
        />
        <Button
          type="button"
          variant="secondary"
          disabled={isPending}
          onClick={handleRequestCode}
        >
          Send reset code
        </Button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Reset code</Label>
          <Input
            id="code"
            value={code}
            onChange={event => setCode(event.target.value)}
            placeholder="6-digit code"
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            placeholder="At least 6 characters"
            disabled={isPending}
          />
        </div>
      </div>
      <Button type="button" disabled={isPending} onClick={handleResetPassword}>
        Update password
      </Button>
    </div>
  )
}

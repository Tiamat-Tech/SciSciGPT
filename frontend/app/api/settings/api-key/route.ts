import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getAnthropicApiKeyForUser } from '@/app/settings/actions'

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ apiKey: null }, { status: 401 })
  }

  const apiKey = await getAnthropicApiKeyForUser(session.user.id)
  return NextResponse.json({ apiKey: apiKey ?? null })
}

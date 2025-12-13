import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { claimQuestionSlot } from '@/app/settings/actions'

export async function POST(request: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json(
      { allowed: false, message: 'Unauthorized', hasAnthropicKey: false },
      { status: 401 }
    )
  }

  let chatId: string | undefined
  try {
    const body = await request.json()
    if (body && typeof body.chatId === 'string') {
      chatId = body.chatId
    }
  } catch {
    // ignore malformed bodies; default to undefined chatId
  }

  const result = await claimQuestionSlot(session.user.id, chatId)
  return NextResponse.json(result)
}

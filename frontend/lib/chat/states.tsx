import 'server-only'

export const maxDuration = 300;

import { createAI, getAIState } from 'ai/rsc'
import { nanoid } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'

import { submitUserMessage } from '@/lib/chat/actions'
import { render_event } from '@/lib/chat/render'

export type AIState = {
	chatId: string
	messages: any[]
	title?: string
}

export type UIState = {
	id: string
	display: React.ReactNode
	type: string
}[]

export const AI = createAI<AIState, UIState>({
	actions: { submitUserMessage },
	initialUIState: [] as UIState,
	initialAIState: { chatId: nanoid(), messages: [] } as AIState,
	onGetUIState: async () => { 
		'use server'
		const session = await auth()

		if (session && session.user) {
			const aiState = getAIState() as Chat

			if (aiState) {
				const uiState = getUIStateFromAIState(aiState)
				return uiState
			}
		} else {
			return undefined
		}
	},
	onSetAIState: async ({ state }: { state: AIState }) => {
		'use server'

		const session = await auth()

		if (session && session.user) {

			const { chatId, messages, title } = state

			const createdAt = new Date()
			const userId = session.user.id as string
			const path = `/chat/${chatId}`
			
			const chat: Chat = {
				id: chatId,
				title: title ?? "Test",
				userId,
				createdAt,
				messages,
				path,
				status: 'active'
			}

			await saveChat(chat)

		} else {
			return
		}
	}
})


export const getUIStateFromAIState = (aiState: any) => {
	return aiState.messages
		.map((event: any, index: any) => {
			const data = JSON.parse(JSON.parse(event).data);
			
			let node;
			try {
				node = render_event(data);
			} catch (error) {
				node = null;
			}

			return {
				id: `${aiState.chatId}-${index}`,
				display: node,
				type: data.name
			}
		})
}
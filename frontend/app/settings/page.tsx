import { auth } from '@/auth'
import { SettingsPage } from '@/components/settings-page'
import { getSettingsSnapshot } from './actions'
import { redirect } from 'next/navigation'
import { SidebarDesktop } from '@/components/sidebar-desktop'

export const metadata = {
  title: 'Settings'
}

export default async function SettingsRoute() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login?next=/settings')
  }

  const snapshot = await getSettingsSnapshot()

  if (!snapshot) {
    redirect('/login?next=/settings')
  }

  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <SidebarDesktop />
      <main className="flex-1 overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <div className="flex justify-center p-4">
          <div className="w-full max-w-5xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Account settings</h1>
              <p className="text-sm text-muted-foreground">
                Manage email verification, password recovery, and your Anthropic API key.
              </p>
            </div>
            <SettingsPage initialSettings={snapshot} />
          </div>
        </div>
      </main>
    </div>
  )
}

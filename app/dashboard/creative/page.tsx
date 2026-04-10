'use client'
import { useAuth } from '@/hooks/useAuth'
import GlassCard from '@/components/ui/GlassCard'

export default function CreativeAssetsPage() {
  const { user } = useAuth()

  const driveUrl = user?.google_drive_folder_id
    ? `https://drive.google.com/embeddedfolderview?id=${user.google_drive_folder_id}#grid`
    : null

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
          Creative Assets 🎬
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Your monthly content is uploaded here by the Ecomate Creative Team.
        </p>
      </div>

      <GlassCard hover={false} className="flex flex-col items-center justify-center">
        {driveUrl ? (
          <iframe
            src={driveUrl}
            className="w-full rounded-xl border border-[var(--color-border)]"
            style={{ height: 600 }}
            title="Google Drive Creative Assets"
          />
        ) : (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="font-syne text-lg font-bold text-[var(--color-text)] mb-2">
              No Creative Folder Linked
            </h3>
            <p className="text-sm text-[var(--color-muted)] max-w-md mx-auto mb-6">
              Your Ecomate account manager will link your Google Drive folder
              once your creative subscription is active. All videos, graphics,
              and ad assets will appear here automatically.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
              📧 Contact your account manager to get started
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  )
}

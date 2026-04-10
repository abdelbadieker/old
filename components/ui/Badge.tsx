interface BadgeProps {
  variant?: 'purple' | 'success' | 'danger' | 'warning' | 'gold'
  children: React.ReactNode
  className?: string
}

const variantMap = {
  purple: 'badge-purple',
  success: 'badge-success',
  danger: 'badge-danger',
  warning: 'badge-warning',
  gold: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
}

export default function Badge({ variant = 'purple', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge ${variantMap[variant]} ${className}`}>
      {children}
    </span>
  )
}

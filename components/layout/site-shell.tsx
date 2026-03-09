import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function SiteContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('px-6 lg:px-10', className)}>{children}</div>
}

export function SectionSpacing({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={cn('py-24 lg:py-32', className)}>{children}</section>
}

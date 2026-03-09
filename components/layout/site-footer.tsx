import Link from "next/link"
import { SiteContainer } from "@/components/layout/site-shell"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-10">
      <SiteContainer>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Aden Joseph
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Interaction Designer crafting considered digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/playground">Playground</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <a
              href="mailto:aden.1024.joseph@gmail.com"
              className="font-display text-xs font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-accent/45" aria-hidden="true" />
            <p className="font-display text-xs tracking-wider text-muted-foreground/30">2026 · Made through code</p>
          </div>
        </div>
      </SiteContainer>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-display text-xs font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  )
}

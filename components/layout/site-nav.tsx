"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SiteContainer } from "@/components/layout/site-shell"
import { Pixel } from "@/components/ui/pixel"
import { defaultTransition } from "@/lib/motion"

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/playground", label: "Playground" },
      { href: "/about", label: "About" },
    ],
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      data-site-nav="true"
      className={`fixed left-0 right-0 top-0 z-[70] transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <SiteContainer>
        <nav className="flex items-center justify-between py-6" aria-label="Main navigation">
          <Link href="/" className="group flex items-center gap-2 text-foreground" aria-label="Aden Joseph - Home">
            <span className="font-display text-sm font-semibold uppercase tracking-wider">AJ</span>
            <Pixel size="sm" interactive cubeMode blink={false} />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
            <a
              href="mailto:aden.1024.joseph@gmail.com"
              className="font-display text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-accent-hover active:text-accent-pressed"
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((state) => !state)}
            className="flex flex-col items-end gap-1 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span
              className={`block h-px bg-foreground transition-all duration-200 ${
                mobileOpen ? "w-5 translate-y-[3px] rotate-45" : "w-5"
              }`}
            />
            <span
              className={`block h-px bg-foreground transition-all duration-200 ${
                mobileOpen ? "w-5 -translate-y-[2px] -rotate-45" : "w-3"
              }`}
            />
          </button>
        </nav>
      </SiteContainer>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={defaultTransition}
            onClick={closeMobile}
          >
            <motion.div
              className="flex h-full items-center justify-center px-6"
              onClick={(event) => event.stopPropagation()}
            >
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="flex flex-col items-center gap-8 text-center"
              >
                {links.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.45,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={`font-display text-4xl font-semibold tracking-tight transition-colors ${
                        isActive(link.href)
                          ? "text-accent"
                          : "text-muted-foreground hover:text-accent-hover active:text-accent-pressed"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}

                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    },
                  }}
                >
                  <a
                    href="mailto:aden.1024.joseph@gmail.com"
                    onClick={closeMobile}
                    className="font-display text-2xl font-medium tracking-wide text-muted-foreground transition-colors hover:text-accent-hover active:text-accent-pressed"
                  >
                    Contact
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`group relative font-display text-sm font-medium tracking-wide transition-colors ${
        active ? "text-accent" : "text-muted-foreground hover:text-accent-hover active:text-accent-pressed"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  )
}

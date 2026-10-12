'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { useUIStore } from '@/lib/store'
import { ArrowRight, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen)
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu)
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 253, 245, 0.98)' : 'rgba(255, 253, 245, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '2px solid #1E293B',
          padding: isScrolled ? '10px 16px' : '14px 16px',
          boxShadow: isScrolled ? '0 4px 16px rgba(30, 41, 59, 0.12)' : 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          animation: 'headerSlideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
          onClick={closeMobileMenu}
          className="group"
        >
          {/* Logo with no border box or background */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo size={38} />
          </div>
          <span
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: '22px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #dfb76c 0%, #d4af37 50%, #b89047 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: '#d4af37',
              letterSpacing: '-0.5px',
              lineHeight: 1.1,
              display: 'inline-block',
            }}
          >
            WexLogic
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '2px solid #1E293B',
            borderRadius: '9999px',
            padding: '5px 10px',
            boxShadow: '3px 3px 0px #1E293B',
          }}
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '5px 13px',
                  borderRadius: '9999px',
                  color: isActive ? '#1E293B' : '#475569',
                  backgroundColor: isActive ? '#FBBF24' : 'transparent',
                  border: isActive ? '2px solid #1E293B' : '2px solid transparent',
                  boxShadow: isActive ? '2px 2px 0px #1E293B' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className={isActive ? '' : 'hover:bg-slate-100 hover:text-slate-900'}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/contact"
            className="candy-btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <span>Free Call</span>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#1E293B',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowRight size={12} strokeWidth={3} />
            </div>
          </Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="hamburger-btn"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            backgroundColor: '#FFFFFF',
            border: '2px solid #1E293B',
            borderRadius: '12px',
            padding: '9px 11px',
            cursor: 'pointer',
            flexDirection: 'column',
            gap: '5px',
            boxShadow: '3px 3px 0px #1E293B',
          }}
        >
          <span
            style={{
              width: 22,
              height: 2.5,
              backgroundColor: '#1E293B',
              display: 'block',
              borderRadius: 2,
              transition: 'all 0.25s',
              transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7.5px)' : 'none',
            }}
          />
          <span
            style={{
              width: 22,
              height: 2.5,
              backgroundColor: '#1E293B',
              display: 'block',
              borderRadius: 2,
              transition: 'all 0.25s',
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 22,
              height: 2.5,
              backgroundColor: '#1E293B',
              display: 'block',
              borderRadius: 2,
              transition: 'all 0.25s',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7.5px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 65,
            left: 0,
            right: 0,
            zIndex: 49,
            backgroundColor: '#FFFDF5',
            borderBottom: '3px solid #1E293B',
            boxShadow: '0 8px 0px #1E293B',
            padding: '20px 24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMobileMenu}
                style={{
                  padding: '10px 16px',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  borderRadius: '12px',
                  border: '2px solid #1E293B',
                  backgroundColor: isActive ? '#FBBF24' : '#FFFFFF',
                  color: '#1E293B',
                  boxShadow: isActive ? '3px 3px 0px #1E293B' : '2px 2px 0px #CBD5E1',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{label}</span>
                {isActive && <Sparkles size={16} />}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="candy-btn-primary"
            onClick={closeMobileMenu}
            style={{
              marginTop: '8px',
              textAlign: 'center',
              padding: '12px',
              fontSize: '14px',
            }}
          >
            <span>Book Free Call</span>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#1E293B',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowRight size={12} strokeWidth={3} />
            </div>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

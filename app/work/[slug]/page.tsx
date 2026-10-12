import { Header } from '@/components/wexlogic/Header'
import { Footer } from '@/components/wexlogic/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/db'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found — WexLogic' }
  return {
    title: `${project.title} — WexLogic`,
    description: project.desc.slice(0, 155) + '...',
    alternates: {
      canonical: `https://wexlogic.com/work/${slug}`
    }
  }
}

export default async function WorkProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = getProjectBySlug(slug)

  if (!data) {
    notFound()
  }

  const client = 'WexLogic Client'
  const year = '2026'
  const services = data.tags
  const tag = data.tags.join(' · ')
  const intro = data.about

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: '#1E293B', backgroundColor: '#FFFDF5' }}>
      <Header />

      <section style={{ padding: '36px 16px 48px', backgroundColor: '#FFFFFF', borderBottom: '2px solid #1E293B' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1560px',
            margin: '0 auto',
            padding: '0 6px',
            boxSizing: 'border-box',
          }}
        >
          {/* Back Navigation & Badge */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link href="/work" className="candy-btn-secondary" style={{ padding: '6px 18px', fontSize: '12px' }}>
              ← ALL WORK
            </Link>
            <span className="badge-pill badge-pink">
              <Sparkles size={13} className="text-white" />
              Case Study
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: 'clamp(40px, 6.5vw, 76px)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: '12px',
              color: '#1E293B',
              letterSpacing: '-1.5px',
            }}
          >
            {data.title}
          </h1>
          <p
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              color: '#8B5CF6',
              marginBottom: '40px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {tag}
          </p>

          {/* Cover Image Container */}
          <div
            style={{
              width: '100%',
              height: 'clamp(280px, 45vw, 540px)',
              position: 'relative',
              border: '3px solid #1E293B',
              borderRadius: '24px',
              boxShadow: '8px 8px 0px 0px #1E293B',
              marginBottom: '56px',
              overflow: 'hidden',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              boxSizing: 'border-box',
            }}
          >
            <Image
              src={data.image}
              alt={data.title}
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Details Sidebar / Meta Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '56px' }}>
            {/* Left: Project Metrics */}
            <div
              className="sticker-card"
              style={{
                padding: '36px 32px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #1E293B',
                borderRadius: '24px',
                boxShadow: '6px 6px 0px #1E293B',
                height: 'fit-content',
              }}
            >
              <h3 style={{ fontFamily: "'Outfit'", fontSize: '22px', fontWeight: 800, color: '#1E293B', marginBottom: '20px' }}>
                Project Metrics
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#F472B6', fontWeight: 800, fontFamily: "'Outfit'" }}>
                    Client
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>{client}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8B5CF6', fontWeight: 800, fontFamily: "'Outfit'" }}>
                    Year
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>{year}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#34D399', fontWeight: 800, fontFamily: "'Outfit'" }}>
                    Scope of Services
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {services.map((serv, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#F8FAFC',
                          color: '#1E293B',
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          border: '1.5px solid #1E293B',
                          boxShadow: '2px 2px 0px #CBD5E1',
                        }}
                      >
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Story */}
            <div
              className="sticker-card"
              style={{
                padding: '36px 32px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #1E293B',
                borderRadius: '24px',
                boxShadow: '6px 6px 0px #1E293B',
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
              }}
            >
              <div>
                <h2 style={{ fontFamily: "'Outfit'", fontSize: '22px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>
                  Overview
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#64748B', fontWeight: 500, marginBottom: '24px' }}>
                  {intro}
                </p>

                <h2 style={{ fontFamily: "'Outfit'", fontSize: '22px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>
                  The Challenge
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#64748B', fontWeight: 500, marginBottom: '24px' }}>
                  {data.challenge}
                </p>

                <h2 style={{ fontFamily: "'Outfit'", fontSize: '22px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>
                  Our Solution
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#64748B', fontWeight: 500 }}>
                  {data.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Results Block */}
          <div
            className="sticker-card"
            style={{
              padding: '40px 32px',
              backgroundColor: '#ECFDF5',
              border: '3px solid #1E293B',
              boxShadow: '8px 8px 0px 0px #1E293B',
              borderRadius: '24px',
            }}
          >
            <h2 style={{ fontFamily: "'Outfit'", fontSize: '32px', fontWeight: 900, color: '#1E293B', marginBottom: '24px', letterSpacing: '-0.5px' }}>
              The Impact & Results
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {data.results.map((res, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #1E293B',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    boxShadow: '3px 3px 0px #1E293B',
                  }}
                >
                  <CheckCircle2 size={20} className="text-[#059669] flex-shrink-0" />
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>{res}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Call to Action */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '64px' }}>
            <Link href="/contact" className="candy-btn-primary" style={{ padding: '14px 36px', fontSize: '15px' }}>
              <span>Book a Call to Build Yours</span>
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#1E293B',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowRight size={13} strokeWidth={3} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

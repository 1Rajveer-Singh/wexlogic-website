import { Header } from '@/components/wexlogic/Header'
import { Footer } from '@/components/wexlogic/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/db'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found — WexLogic' }
  return {
    title: `${service.title} — WexLogic`,
    description: service.desc.slice(0, 155) + '...',
    alternates: {
      canonical: `https://wexlogic.com/services/${slug}`
    }
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = getServiceBySlug(slug)

  if (!data) {
    notFound()
  }

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
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link href="/services" className="candy-btn-secondary" style={{ padding: '6px 18px', fontSize: '12px' }}>
              ← ALL SERVICES
            </Link>
            <span className="badge-pill badge-violet">
              <Sparkles size={13} className="text-white" />
              Service Overview
            </span>
          </div>

          {/* Title and subtitle */}
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
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 800,
              color: '#8B5CF6',
              marginBottom: '44px',
            }}
          >
            {data.subtitle}
          </p>

          {/* Service Showcase Video Player */}
          <div
            style={{
              width: '100%',
              height: 'clamp(260px, 45vw, 480px)',
              position: 'relative',
              border: '3px solid #1E293B',
              borderRadius: '24px',
              boxShadow: '8px 8px 0px 0px #1E293B',
              marginBottom: '56px',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={data.videoUrl} type="video/mp4" />
            </video>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Philosophy */}
            <div
              className="sticker-card"
              style={{
                padding: '36px 32px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #1E293B',
                borderRadius: '24px',
                boxShadow: '6px 6px 0px #1E293B',
              }}
            >
              <h2 style={{ fontFamily: "'Outfit'", fontSize: '24px', fontWeight: 800, color: '#1E293B', marginBottom: '14px' }}>
                The Philosophy
              </h2>
              <div style={{ fontSize: '15px', lineHeight: 1.75, color: '#64748B', marginBottom: '36px', fontWeight: 500 }}>
                {data.desc}
              </div>

              <h2 style={{ fontFamily: "'Outfit'", fontSize: '24px', fontWeight: 800, color: '#1E293B', marginBottom: '16px' }}>
                What We Deliver
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                    <CheckCircle2 size={18} className="text-[#8B5CF6] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workflow */}
            <div
              className="sticker-card"
              style={{
                padding: '36px 32px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #1E293B',
                borderRadius: '24px',
                boxShadow: '6px 6px 0px #1E293B',
              }}
            >
              <h2 style={{ fontFamily: "'Outfit'", fontSize: '24px', fontWeight: 800, color: '#1E293B', marginBottom: '20px' }}>
                Modern Digital Workflow
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {data.process.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '2px solid #1E293B',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      boxShadow: '3px 3px 0px #CBD5E1',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: i % 2 === 0 ? '#FBBF24' : '#F472B6',
                        color: '#1E293B',
                        border: '1.5px solid #1E293B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Outfit'",
                        fontSize: '15px',
                        fontWeight: 900,
                        flexShrink: 0,
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '64px' }}>
            <Link href="/contact" className="candy-btn-primary" style={{ padding: '14px 36px', fontSize: '15px' }}>
              <span>Build With WexLogic</span>
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

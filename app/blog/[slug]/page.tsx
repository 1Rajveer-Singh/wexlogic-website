import { Header } from '@/components/wexlogic/Header'
import { Footer } from '@/components/wexlogic/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/db'
import { Sparkles } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found — WexLogic' }
  return {
    title: `${post.title} — WexLogic`,
    description: post.excerpt.slice(0, 155) + '...',
    alternates: {
      canonical: `https://wexlogic.com/blog/${slug}`
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3
            key={index}
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: '22px',
              fontWeight: 800,
              color: '#1E293B',
              marginTop: '32px',
              marginBottom: '16px',
            }}
          >
            {paragraph.replace('### ', '')}
          </h3>
        )
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2
            key={index}
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: '26px',
              fontWeight: 800,
              color: '#1E293B',
              marginTop: '40px',
              marginBottom: '20px',
            }}
          >
            {paragraph.replace('## ', '')}
          </h2>
        )
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map((item) => item.replace('- ', ''))
        return (
          <ul
            key={index}
            style={{
              paddingLeft: '24px',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              color: '#475569',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {items.map((it, idx) => (
              <li key={idx} style={{ listStyleType: 'disc' }}>
                {it}
              </li>
            ))}
          </ul>
        )
      }

      if (/^\d+\.\s/.test(paragraph)) {
        const items = paragraph.split('\n').map((item) => item.replace(/^\d+\.\s/, ''))
        return (
          <ol
            key={index}
            style={{
              paddingLeft: '24px',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              color: '#475569',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {items.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ol>
        )
      }

      return (
        <p
          key={index}
          style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#475569',
            marginBottom: '24px',
            fontWeight: 500,
          }}
        >
          {paragraph}
        </p>
      )
    })
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: '#1E293B', backgroundColor: '#FFFDF5' }}>
      <Header />

      <article style={{ padding: '36px 16px 48px', backgroundColor: '#FFFFFF', borderBottom: '2px solid #1E293B' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 6px', boxSizing: 'border-box' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link href="/blog" className="candy-btn-secondary" style={{ padding: '6px 18px', fontSize: '12px' }}>
              ← ALL ARTICLES
            </Link>
            <span className="badge-pill badge-violet">
              <Sparkles size={13} className="text-white" />
              {post.category}
            </span>
          </div>

          {/* Title and stats */}
          <h1
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: 'clamp(38px, 6vw, 64px)',
              lineHeight: 1.05,
              marginBottom: '24px',
              color: '#1E293B',
              fontWeight: 900,
              letterSpacing: '-1.5px',
            }}
          >
            {post.title}
          </h1>

          {/* Author Details Card */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid #E2E8F0',
              borderBottom: '2px solid #E2E8F0',
              padding: '16px 0',
              marginBottom: '40px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #1E293B',
                }}
              >
                <Image src={post.author.avatar} alt={post.author.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1E293B', fontFamily: "'Outfit'" }}>
                  {post.author.name}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{post.author.role}</div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
              <span>Published on {post.date}</span>
              <span style={{ margin: '0 8px' }}>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div
            style={{
              width: '100%',
              height: 'clamp(220px, 35vw, 440px)',
              position: 'relative',
              border: '3px solid #1E293B',
              borderRadius: '24px',
              boxShadow: '8px 8px 0px 0px #1E293B',
              marginBottom: '48px',
              overflow: 'hidden',
            }}
          >
            <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: 'cover' }} priority />
          </div>

          {/* Article Text Content */}
          <div
            className="sticker-card"
            style={{
              padding: '40px 36px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #1E293B',
              borderRadius: '24px',
              boxShadow: '6px 6px 0px #1E293B',
            }}
          >
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}

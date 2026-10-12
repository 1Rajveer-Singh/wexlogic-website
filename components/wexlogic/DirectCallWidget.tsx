'use client'

import { useState } from 'react'
import { Phone, MessageSquare, X } from 'lucide-react'

export function DirectCallWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        fontFamily: "'Outfit', system-ui, sans-serif",
      }}
    >
      {isOpen ? (
        <div
          className="sticker-card"
          style={{
            padding: '24px',
            width: '280px',
            backgroundColor: '#FFFFFF',
            border: '3px solid #1E293B',
            borderRadius: '20px',
            boxShadow: '6px 6px 0px #1E293B',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            animation: 'scaleUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge-pill badge-yellow" style={{ fontSize: '10px', padding: '3px 10px' }}>
              DIRECT LINE
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: '#F1F5F9',
                border: '1.5px solid #1E293B',
                color: '#1E293B',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, fontWeight: 500 }}>
            Have a project in mind? Call or chat directly with our creative team.
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href="tel:+917737297548"
              className="candy-btn-primary"
              style={{
                width: '100%',
                padding: '10px 16px',
                fontSize: '13px',
                borderRadius: '12px',
              }}
            >
              <Phone size={14} strokeWidth={2.5} />
              <span>Call Us Now</span>
            </a>

            <a
              href="https://wa.me/917737297548"
              target="_blank"
              rel="noopener noreferrer"
              className="candy-btn-secondary"
              style={{
                width: '100%',
                padding: '10px 16px',
                fontSize: '13px',
                borderRadius: '12px',
                backgroundColor: '#34D399',
                color: '#1E293B',
              }}
            >
              <MessageSquare size={14} strokeWidth={2.5} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Direct Call Menu"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#FBBF24',
            border: '2px solid #1E293B',
            boxShadow: '4px 4px 0px #1E293B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1E293B]"
        >
          <Phone size={22} strokeWidth={2.5} className="text-[#1E293B]" />
        </button>
      )}
    </div>
  )
}

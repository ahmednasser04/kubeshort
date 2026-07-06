import { useEffect, useRef, useState } from 'react'
import type { ShortUrlRecord } from '../../types/url'
import styles from './UrlResult.module.css'

interface UrlResultProps {
  record: ShortUrlRecord
  onCopy: (value: string) => Promise<void>
}

function UrlResult({ record, onCopy }: UrlResultProps) {
  const [copyLabel, setCopyLabel] = useState('Copy')
  const resetTimerRef = useRef<number | null>(null)

  async function handleCopy() {
    try {
      await onCopy(record.shortUrl)
      setCopyLabel('Copied ✓')

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopyLabel('Copy')
        resetTimerRef.current = null
      }, 2000)
    } catch {
      setCopyLabel('Copy')
    }
  }

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  return (
    <section className={styles.card} aria-labelledby="result-title">
      <div className={styles.header}>
        <div>
          <p className={styles.sectionLabel}>Generated link</p>
          <h2 id="result-title" className={styles.title}>
            Your short link is ready
          </h2>
        </div>
      </div>

      <div className={styles.resultGrid}>
        <div>
          <p className={styles.fieldLabel}>Original URL</p>
          <p className={styles.fieldValue}>{record.originalUrl}</p>
        </div>

        <div className={styles.shortUrlRow}>
          <div>
            <p className={styles.fieldLabel}>Generated short URL</p>
            <a className={styles.shortUrl} href={record.shortUrl} target="_blank" rel="noreferrer">
              {record.shortUrl}
            </a>
          </div>

          <button className={styles.copyButton} type="button" onClick={handleCopy}>
            {copyLabel}
          </button>
        </div>

        <div>
          <p className={styles.fieldLabel}>Short Code</p>
          <p className={styles.fieldValue}>{record.shortCode}</p>
        </div>

        <div>
          <p className={styles.fieldLabel}>Click Count</p>
          <p className={styles.fieldValue}>{record.clicks}</p>
        </div>

        <div>
          <p className={styles.fieldLabel}>Status</p>
          <p className={styles.fieldValue}>{record.status}</p>
        </div>

        <div>
          <p className={styles.fieldLabel}>Created Date</p>
          <p className={styles.fieldValue}>{new Date(record.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </section>
  )
}

export default UrlResult
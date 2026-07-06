import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import UrlResult from '../../components/UrlResult/UrlResult'
import { getApiErrorMessage } from '../../services/api'
import { getUrlByShortCode } from '../../services/urlService'
import type { ShortUrlRecord } from '../../types/url'
import styles from './UrlDetails.module.css'

function UrlDetails() {
  const { shortCode } = useParams()
  const [record, setRecord] = useState<ShortUrlRecord | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    let isActive = true

    async function loadUrlDetails() {
      if (!shortCode) {
        if (isActive) {
          setIsNotFound(true)
          setIsLoading(false)
        }

        return
      }

      setIsLoading(true)
      setErrorMessage('')
      setIsNotFound(false)

      try {
        const response = await getUrlByShortCode(shortCode)

        if (isActive) {
          setRecord(response)
        }
      } catch (error) {
        if (!isActive) {
          return
        }

        if (error && typeof error === 'object' && 'response' in error) {
          const response = error.response as { status?: number } | undefined

          if (response?.status === 404) {
            setIsNotFound(true)
            return
          }
        }

        setErrorMessage(getApiErrorMessage(error))
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadUrlDetails()

    return () => {
      isActive = false
    }
  }, [shortCode])

  async function handleCopy(value: string) {
    await navigator.clipboard.writeText(value)
  }

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.shell}>
        <Navbar />

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>KubeShort Platform</p>
            <h1>URL Details</h1>
            <p className={styles.subtitle}>
              Latest backend data for this short link, refreshed on every page load.
            </p>
          </div>

          <div className={styles.heroPanel}>
            {isLoading ? (
              <article className={styles.emptyState} aria-live="polite">
                <h2 className={styles.emptyTitle}>Loading link details</h2>
                <p className={styles.emptyCopy}>Fetching the latest record from the backend.</p>
              </article>
            ) : isNotFound ? (
              <article className={styles.emptyState} aria-labelledby="not-found-title">
                <h2 id="not-found-title" className={styles.emptyTitle}>
                  Link not found
                </h2>
                <p className={styles.emptyCopy}>
                  The short code does not exist or is no longer available.
                </p>
                <Link className={styles.backLink} to="/">
                  Return home
                </Link>
              </article>
            ) : errorMessage ? (
              <article className={styles.emptyState} aria-labelledby="error-title">
                <h2 id="error-title" className={styles.emptyTitle}>
                  Unable to load link
                </h2>
                <p className={styles.emptyCopy}>{errorMessage}</p>
                <Link className={styles.backLink} to="/">
                  Return home
                </Link>
              </article>
            ) : record ? (
              <UrlResult record={record} onCopy={handleCopy} />
            ) : null}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

export default UrlDetails
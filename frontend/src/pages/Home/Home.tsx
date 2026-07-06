import { type FormEvent, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import StatisticsCard from '../../components/StatisticsCard/StatisticsCard'
import UrlForm from '../../components/UrlForm/UrlForm'
import UrlResult from '../../components/UrlResult/UrlResult'
import { isValidUrl, shortenUrlMock } from '../../services/urlService'
import type { ShortUrlRecord } from '../../types/url'
import styles from './Home.module.css'

function Home() {
  const [url, setUrl] = useState('')
  const [record, setRecord] = useState<ShortUrlRecord | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedUrl = url.trim()

    if (!isValidUrl(trimmedUrl)) {
      setErrorMessage('Enter a valid URL to generate a short link.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await shortenUrlMock(trimmedUrl)
      setRecord(response)
      setUrl(trimmedUrl)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to shorten the URL.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h1>Cloud Native URL Shortener</h1>
            <p className={styles.subtitle}>
              Create short, trackable links for modern cloud workloads with a clean workflow
              built for enterprise teams.
            </p>
          </div>

          <div className={styles.heroPanel}>
            <UrlForm
              value={url}
              errorMessage={errorMessage}
              helperText="A placeholder API is wired in until the backend is ready."
              isLoading={isSubmitting}
              onChange={setUrl}
              onSubmit={handleSubmit}
            />
          </div>
        </section>

        <section className={styles.contentGrid}>
          {record ? (
            <>
              <UrlResult key={record.shortUrl} record={record} onCopy={handleCopy} />

              <div className={styles.statsSection}>
                <StatisticsCard
                  label="Clicks"
                  value={String(record.clicks)}
                  helperText="Mock engagement data"
                  tone="blue"
                />
                <StatisticsCard
                  label="Created"
                  value={record.createdAt}
                  helperText="Generated from the mock service"
                />
                <StatisticsCard
                  label="Status"
                  value={record.status}
                  helperText="Link is active and ready"
                  tone="success"
                />
              </div>
            </>
          ) : (
            <article className={styles.emptyState} aria-labelledby="empty-state-title">
              <h2 id="empty-state-title" className={styles.emptyTitle}>
                No shortened URL yet
              </h2>
              <p className={styles.emptyCopy}>
                Paste a URL above and generate your first short link.
              </p>
            </article>
          )}
        </section>

        <Footer />
      </div>
    </main>
  )
}

export default Home
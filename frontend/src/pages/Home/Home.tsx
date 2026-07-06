import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import UrlForm from '../../components/UrlForm/UrlForm'
import { getApiErrorMessage } from '../../services/api'
import { isValidUrl, shortenUrl } from '../../services/urlService'
import styles from './Home.module.css'

function Home() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
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
      const response = await shortenUrl(trimmedUrl)
      setUrl(trimmedUrl)
      navigate(`/${response.shortCode}`)
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
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
              helperText="Connected to the live backend API."
              isLoading={isSubmitting}
              onChange={setUrl}
              onSubmit={handleSubmit}
            />
          </div>
        </section>

        <section className={styles.contentGrid}>
          <article className={styles.emptyState} aria-labelledby="empty-state-title">
            <h2 id="empty-state-title" className={styles.emptyTitle}>
              No shortened URL yet
            </h2>
            <p className={styles.emptyCopy}>
              Paste a URL above and generate your first short link.
            </p>
          </article>
        </section>

        <Footer />
      </div>
    </main>
  )
}

export default Home
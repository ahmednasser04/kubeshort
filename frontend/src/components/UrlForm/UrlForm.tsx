import type { FormEvent } from 'react'
import styles from './UrlForm.module.css'

interface UrlFormProps {
  value: string
  errorMessage?: string
  helperText?: string
  isLoading?: boolean
  onChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function UrlForm({
  value,
  errorMessage,
  helperText,
  isLoading = false,
  onChange,
  onSubmit,
}: UrlFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit} id="shorten-url">
      <label className={styles.label} htmlFor="url-input">
        Paste a long URL
      </label>
      <div className={styles.controls}>
        <input
          id="url-input"
          className={styles.input}
          type="url"
          inputMode="url"
          autoComplete="url"
          autoFocus
          placeholder="https://example.com/your-long-link"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Short Link'}
        </button>
      </div>
      <div className={styles.metaRow} aria-live="polite">
        <p className={errorMessage ? styles.error : styles.helper}>
          {errorMessage || helperText || 'Supports https URLs and bare domains.'}
        </p>
      </div>
    </form>
  )
}

export default UrlForm
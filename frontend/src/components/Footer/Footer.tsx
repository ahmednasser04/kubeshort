import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.title}>KubeShort</p>
        <p className={styles.copy}>
          Clean, cloud-native link management for modern teams.
        </p>
      </div>

      <div className={styles.links}>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>

      <p className={styles.legal}>© 2026 KubeShort. All rights reserved.</p>
    </footer>
  )
}

export default Footer
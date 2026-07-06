import styles from './Navbar.module.css'

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand} aria-label="KubeShort">
        <div className={styles.logoMark}>KS</div>
        <div>
          <p className={styles.brandName}>KubeShort</p>
          <p className={styles.brandTagline}>Cloud-native link shortener</p>
        </div>
      </div>

      <a className={styles.navLink} href="#shorten-url">
        Shorten a URL
      </a>
    </header>
  )
}

export default Navbar
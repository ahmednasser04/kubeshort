import { Link } from 'react-router-dom'

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

      <Link className={styles.navLink} to="/">
        Shorten a URL
      </Link>
    </header>
  )
}

export default Navbar
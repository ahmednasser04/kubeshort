import styles from './StatisticsCard.module.css'

interface StatisticsCardProps {
  label: string
  value: string
  helperText?: string
  tone?: 'blue' | 'neutral' | 'success'
}

function StatisticsCard({ label, value, helperText, tone = 'neutral' }: StatisticsCardProps) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {helperText ? <p className={styles.helper}>{helperText}</p> : null}
    </article>
  )
}

export default StatisticsCard
import styles from './Loader.module.css'

interface LoaderProps {
  fullscreen?: boolean
}

const Loader = ({ fullscreen = false }: LoaderProps) => (
  <div className={fullscreen ? styles.fullscreen : styles.inline}>
    <span className={styles.spinner} aria-label="Загрузка" />
  </div>
)

export default Loader

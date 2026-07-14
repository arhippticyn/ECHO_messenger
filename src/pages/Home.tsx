import { LuMessageSquare } from 'react-icons/lu'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.icon}>
        <LuMessageSquare />
      </div>
      <h2>Выберите чат</h2>
      <p>Выберите диалог из списка или начните новую переписку</p>
    </div>
  )
}

export default Home

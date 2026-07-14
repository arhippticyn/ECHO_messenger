import { FaGoogle } from 'react-icons/fa'
import { BACKEND_URL } from '../../api/api'
import styles from './AuthForms.module.css'

const GoogleLogin = () => (
  <button
    className={styles.googleBtn}
    onClick={() => (window.location.href = `${BACKEND_URL}/auth/google`)}
  >
    <FaGoogle /> Войти через Google
  </button>
)

export default GoogleLogin

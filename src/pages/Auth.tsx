import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import GoogleLogin from '../components/Auth/GoogleLogin'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../hooks/reduxHooks'
import { selectIsLogin } from '../redux/Auth/AuthSelectors'
import { GetUser } from '../redux/Auth/AuthOperation'
import styles from './Auth.module.css'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true)
  const dispatch = useTypificatedDispatch()
  const isLogin = useTypificatedSelector(selectIsLogin)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(GetUser())
      .unwrap()
      .then(() => navigate('/home'))
      .catch(() => {})
  }, [dispatch, navigate])

  useEffect(() => {
    if (isLogin) navigate('/home')
  }, [isLogin, navigate])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <h1 className={styles.logo}>echo</h1>
          <p className={styles.tagline}>Мессенджер нового поколения</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${isRegister ? styles.activeTab : ''}`}
            onClick={() => setIsRegister(true)}
          >
            Регистрация
          </button>
          <button
            className={`${styles.tab} ${!isRegister ? styles.activeTab : ''}`}
            onClick={() => setIsRegister(false)}
          >
            Вход
          </button>
        </div>

        {isRegister ? <Register /> : <Login />}

        <div className={styles.divider}>
          <span>или</span>
        </div>

        <GoogleLogin />
      </div>
    </div>
  )
}

export default Auth

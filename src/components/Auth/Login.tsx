import { useForm } from 'react-hook-form'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { LoginUser, type LoginUserType } from '../../redux/Auth/AuthOperation'
import {
  selectError,
  selectIsRefreshing,
} from '../../redux/Auth/AuthSelectors'
import { useNavigate } from 'react-router-dom'
import styles from './AuthForms.module.css'

const Login = () => {
  const dispatch = useTypificatedDispatch()
  const navigate = useNavigate()
  const isRefreshing = useTypificatedSelector(selectIsRefreshing)
  const serverError = useTypificatedSelector(selectError)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserType>({
    defaultValues: { username: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: LoginUserType) => {
    const result = await dispatch(LoginUser(data))
    if (LoginUser.fulfilled.match(result)) {
      navigate('/home')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="login-username">
          Имя пользователя
        </label>
        <input
          id="login-username"
          {...register('username', { required: 'Введите имя пользователя' })}
          type="text"
          autoComplete="username"
          className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
        />
        {errors.username && (
          <span className={styles.fieldError}>{errors.username.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="login-password">
          Пароль
        </label>
        <input
          id="login-password"
          {...register('password', { required: 'Введите пароль' })}
          type="password"
          autoComplete="current-password"
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
        />
        {errors.password && (
          <span className={styles.fieldError}>{errors.password.message}</span>
        )}
      </div>

      {serverError && <p className={styles.serverError}>{serverError}</p>}

      <button type="submit" className={styles.submit} disabled={isRefreshing}>
        {isRefreshing ? 'Вход...' : 'Войти'}
      </button>
    </form>
  )
}

export default Login

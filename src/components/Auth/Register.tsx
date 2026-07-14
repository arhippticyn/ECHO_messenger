import { useForm } from 'react-hook-form'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import {
  RegisterUser,
  type RegisterUserType,
} from '../../redux/Auth/AuthOperation'
import {
  selectError,
  selectIsRefreshing,
} from '../../redux/Auth/AuthSelectors'
import { useNavigate } from 'react-router-dom'
import styles from './AuthForms.module.css'

const Register = () => {
  const dispatch = useTypificatedDispatch()
  const navigate = useNavigate()
  const isRefreshing = useTypificatedSelector(selectIsRefreshing)
  const serverError = useTypificatedSelector(selectError)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserType>({
    defaultValues: { username: '', email: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: RegisterUserType) => {
    const result = await dispatch(RegisterUser(data))
    if (RegisterUser.fulfilled.match(result)) {
      navigate('/home')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="reg-username">
          Имя пользователя
        </label>
        <input
          id="reg-username"
          {...register('username', {
            required: 'Введите имя пользователя',
            minLength: { value: 3, message: 'Минимум 3 символа' },
          })}
          type="text"
          autoComplete="username"
          className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
        />
        {errors.username && (
          <span className={styles.fieldError}>{errors.username.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="reg-email">
          Email
        </label>
        <input
          id="reg-email"
          {...register('email', {
            required: 'Введите email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Некорректный email',
            },
          })}
          type="email"
          autoComplete="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
        />
        {errors.email && (
          <span className={styles.fieldError}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="reg-password">
          Пароль
        </label>
        <input
          id="reg-password"
          {...register('password', {
            required: 'Введите пароль',
            minLength: { value: 6, message: 'Минимум 6 символов' },
          })}
          type="password"
          autoComplete="new-password"
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
        />
        {errors.password && (
          <span className={styles.fieldError}>{errors.password.message}</span>
        )}
      </div>

      {serverError && <p className={styles.serverError}>{serverError}</p>}

      <button type="submit" className={styles.submit} disabled={isRefreshing}>
        {isRefreshing ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}

export default Register

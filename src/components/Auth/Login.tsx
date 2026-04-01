import { useForm } from 'react-hook-form'
import { useTypificatedDispatch } from '../../hooks/reduxHooks'
import styles from '../../styles/Auth/Auth.module.css'
import { LoginUser, type LoginUserType } from '../../redux/Auth/AuthOperation'

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const dispatch = useTypificatedDispatch()

  const { register, handleSubmit } = useForm<LoginUserType>({
    defaultValues: { username: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = (data: LoginUserType) => {
    console.log('Login data:', data)
    dispatch(LoginUser(data))
  }
  return (
    <div>
      <h2 className={styles.Title}>Sign in</h2>

      <form action="" className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="" className={styles.label}>
          Enter username:
        </label>
        <input {...register('username')} type="text" className={styles.input} />
        <label htmlFor="" className={styles.label}>
          Enter password:
        </label>
        <input
          {...register('password')}
          type="password"
          className={styles.input}
        />

        <button type="submit" className={styles.btnS}>
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Login

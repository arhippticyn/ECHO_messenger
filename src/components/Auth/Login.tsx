import { useForm } from 'react-hook-form'
import { useTypificatedDispatch } from '../../hooks/reduxHooks'
import styles from '../../styles/Auth/Auth.module.css'
import { LoginUser, type LoginUserType } from '../../redux/Auth/AuthOperation'
import { useNavigate } from 'react-router-dom'

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const dispatch = useTypificatedDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<LoginUserType>({
    defaultValues: { username: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: LoginUserType) => {
    console.log('Login data:', data)
    const result = await dispatch(LoginUser(data))

    if (LoginUser.fulfilled.match(result)) {
      navigate('/home')
    }
  }
  return (
    <div className={styles.register}>
      <h2 className={styles.Title}>Добро пожаловать</h2>
      <p className={styles.descr}>Зарегестрируйтесь в новый аккаунт</p>

      <form action="" className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="" className={styles.label}>
          Enter username:
        </label>
        <input {...register('username')} type="text" className={styles.input1} />
        <label htmlFor="" className={styles.label}>
          Enter password:
        </label>
        <input
          {...register('password')}
          type="password"
          className={styles.input2}
        />

        <button type="submit" className={styles.btnS}>
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Login

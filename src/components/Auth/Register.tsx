import { useForm } from 'react-hook-form'
import { useTypificatedDispatch } from '../../hooks/reduxHooks'
import {
  RegisterUser,
  type RegisterUserType,
} from '../../redux/Auth/AuthOperation'
import styles from '../../styles/Auth/Auth.module.css'
import { Navigate, useNavigate } from 'react-router-dom'

interface RegisterProps {}

const Register = ({}: RegisterProps) => {
  const dispatch = useTypificatedDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<RegisterUserType>({
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
    <div className={styles.register}>
      <h2 className={styles.Title}>Добро пожаловать</h2>
      <p className={styles.descr}>Зарегестрируйтесь в новый аккаунт</p>
      <form className={styles.Form} action="" onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="">
          Enter username
        </label>
        <input {...register('username')} className={styles.input1} type="text" />
        <label className={styles.label} htmlFor="">
          Enter email
        </label>
        <input {...register('email')} className={styles.input2} type="email" />
        <label className={styles.label} htmlFor="">
          Enter password
        </label>
        <input
          {...register('password')}
          className={styles.input3}
          type="password"
        />

        <button className={styles.btnS} type="submit">
          Зарегестрироватся
        </button>
      </form>
    </div>
  )
}

export default Register

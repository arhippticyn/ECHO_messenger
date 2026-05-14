import { useForm } from 'react-hook-form'
import { useTypificatedDispatch } from '../../hooks/reduxHooks'
import { FaSearch } from 'react-icons/fa'
import { GetUsersBySearch } from '../../redux/Users/UsersOperation'
import styles from '../../styles/Chats/Chats.module.css'


interface UserFormProps {}

const UserForm = ({}: UserFormProps) => {
  const dispatch = useTypificatedDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: { search: '' },
    mode: 'onSubmit',
  })

  const onSubmit = (data: {search: string}) => {
    dispatch(GetUsersBySearch(data.search))
  }
  return (
    <form action="" className={styles.UserForm} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('search')} type="text" className={styles.userInput} placeholder='Поиск пользователей' />
        <button type="submit" className={styles.UserBtnSubmit}><FaSearch /></button>
    </form>
  )
}

export default UserForm

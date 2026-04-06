import { useForm } from 'react-hook-form'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { selectUsers } from '../../redux/Users/UserSelectors'
import { CreateGroupChat } from '../../redux/Chats/ChatsOperation'
import { useEffect } from 'react'
import { GetUsersBySearch } from '../../redux/Users/UsersOperation'

interface ChatsGroupFormProps {}

const ChatsGroupForm = ({}: ChatsGroupFormProps) => {
  const dispatch = useTypificatedDispatch()
  const users = useTypificatedSelector(selectUsers)

  useEffect(() => {
    dispatch(GetUsersBySearch())
  }, [dispatch])

  const { register, handleSubmit } = useForm({
    defaultValues: { title: '', participants: [] },
  })

  const onSubmit = (data: {title: string, participants: number[]}) => {
    dispatch(CreateGroupChat(data))
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Title:</label>
      <input {...register('title')} type="text" />
      <select {...register('participants')} multiple>
        {users?.map(user => (
        <option key={user.id} value={user.id}>  
            {user.username} {user.is_online ? 'online' : 'offline'}
        </option>
        ))}
      </select>

      <button type="submit">Create Group</button>
    </form>
  )
}

export default ChatsGroupForm

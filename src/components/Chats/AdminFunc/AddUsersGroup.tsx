import { useEffect } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../../hooks/reduxHooks'
import { selectUsers } from '../../../redux/Users/UserSelectors'
import { GetUsersBySearch } from '../../../redux/Users/UsersOperation'
import { useForm } from 'react-hook-form'
import { selectChatId } from '../../../redux/Chats/ChatsSelectors'
import { AddUsersGroupO } from '../../../redux/Chats/ChatsOperation'

interface AddUsersGroupProps {}

const AddUsersGroup = ({}: AddUsersGroupProps) => {
  const dispatch = useTypificatedDispatch()
  const users = useTypificatedSelector(selectUsers)
  const chat_id = useTypificatedSelector(selectChatId)

  useEffect(() => {
    dispatch(GetUsersBySearch(null))
  }, [dispatch])

  const { register, handleSubmit } = useForm({
    defaultValues: { participant: '' },
    mode: 'onSubmit',
  })

  const onSubmit = (data: {participant: string}) => {
    if (!chat_id) return
    dispatch(AddUsersGroupO({
        chat_id: chat_id,
        user_id: Number(data.participant)
    }))
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <select {...register('participant')}>
        {users?.map(user => (
          <option key={user.id} value={user.id}>
            {user.username} {user.is_online ? 'online' : 'offline'}
          </option>
        ))}
      </select>

      <button type='submit'>Add user</button>
    </form>
  )
}

export default AddUsersGroup

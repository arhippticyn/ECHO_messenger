import { useForm } from 'react-hook-form'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../../hooks/reduxHooks'
import { selectChatId, selectChats } from '../../../redux/Chats/ChatsSelectors'
import { selectUsers } from '../../../redux/Users/UserSelectors'
import { useEffect } from 'react'
import { GetUsersBySearch } from '../../../redux/Users/UsersOperation'
import { DeleteUsersGroupO } from '../../../redux/Chats/ChatsOperation'

interface DeleteUsersGroupProps {}

const DeleteUsersGroup = ({}: DeleteUsersGroupProps) => {
  const dispatch = useTypificatedDispatch()
  const users = useTypificatedSelector(selectUsers)
  const chat_id = useTypificatedSelector(selectChatId)
  const chats = useTypificatedSelector(selectChats)

  useEffect(() => {
    dispatch(GetUsersBySearch(null))
  }, [dispatch])

  const { register, handleSubmit } = useForm({
    defaultValues: { participant: '' },
    mode: 'onSubmit',
  })

  const onSubmit = (data: { participant: string }) => {
    if (!chat_id) return
    dispatch(
      DeleteUsersGroupO({
        chat_id: chat_id,
        user_id: Number(data.participant),
      })
    )
  }

  const chat = chats.find(chat => chat.id === chat_id)
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <select {...register('participant')}>
        {chat?.participants &&
          chat.participants.map(participant => {
            const user = users?.find(user => user.id === participant.user_id)
            return (
              <option key={participant.user_id} value={participant.user_id}>
                {user?.username || `User ${participant.user_id}`}
              </option>
            )
          })}
      </select>

      <button type="submit">Delete user</button>
    </form>
  )
}

export default DeleteUsersGroup

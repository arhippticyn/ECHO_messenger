import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { CreatePrivateChat } from '../../redux/Chats/ChatsOperation'
import { selectUsers } from '../../redux/Users/UserSelectors'

interface UsersListProps {}

const UsersList = ({}: UsersListProps) => {
  const users = useTypificatedSelector(selectUsers)
  const dispatch = useTypificatedDispatch()

  const handleCreatePrivateChat = async (userId: number) => {
    dispatch(CreatePrivateChat({ user_id: userId }))
  }

  return (
    <ul>
      {users?.map(user => {
        return (
          <li key={user.id}>
            <h4>{user.username}</h4>
            <p>{user.is_online ? 'online' : 'offline'}</p>
            <button onClick={() => handleCreatePrivateChat(user.id)}>Write...</button>
          </li>
        )
      })}
    </ul>
  )
}

export default UsersList

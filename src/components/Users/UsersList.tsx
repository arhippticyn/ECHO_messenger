import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { CreatePrivateChat } from '../../redux/Chats/ChatsOperation'
import styles from '../../styles/Chats/Chats.module.css'
import { selectUsers } from '../../redux/Users/UserSelectors'
import { MdOutlineMessage } from 'react-icons/md'

interface UsersListProps {}

export const getAvatarColor = (name: string) => {
  const colors = [
    { bg: '#e6e6ff', color: '#0000CD' },
    { bg: '#d0f5ee', color: '#0a6e56' },
    { bg: '#eeedfe', color: '#534ab7' },
    { bg: '#faeeda', color: '#854f0b' },
    { bg: '#fbeaf0', color: '#993556' },
    { bg: '#eaf3de', color: '#3b6d11' },
  ]

  const index = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length

  return colors[index]
}

const UsersList = ({}: UsersListProps) => {
  const users = useTypificatedSelector(selectUsers)
  const dispatch = useTypificatedDispatch()
  

  const handleCreatePrivateChat = async (userId: number) => {
    dispatch(CreatePrivateChat({ user_id: userId }))
  }

  return (
    <ul className={styles.userList}>
      {users?.map(user => {
        const { bg, color } = getAvatarColor(user.username)
        return (
          <li className={styles.userLi} key={user.id}>
            <span style={{ background: bg, color }} >{(user.username.slice(0,1) ?? 'U').toUpperCase()}</span>
            <h4>{user.username}</h4>
            <p>{user.is_online ? 'online' : 'offline'}</p>
            <button onClick={() => handleCreatePrivateChat(user.id)}><MdOutlineMessage /></button>
          </li>
        )
      })}
    </ul>
  )
}

export default UsersList

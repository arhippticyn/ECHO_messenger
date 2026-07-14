import { useNavigate } from 'react-router-dom'
import { MdOutlineMessage } from 'react-icons/md'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { CreatePrivateChat } from '../../redux/Chats/ChatsOperation'
import { selectUsers } from '../../redux/Users/UserSelectors'
import { selectUser } from '../../redux/Auth/AuthSelectors'
import Avatar from '../Avatar/Avatar'
import styles from './UsersList.module.css'

const UsersList = () => {
  const users = useTypificatedSelector(selectUsers)
  const currentUser = useTypificatedSelector(selectUser)
  const dispatch = useTypificatedDispatch()
  const navigate = useNavigate()

  const handleCreatePrivateChat = async (userId: number) => {
    const result = await dispatch(CreatePrivateChat({ user_id: userId }))
    if (CreatePrivateChat.fulfilled.match(result) && result.payload?.id) {
      navigate(`/chat/${result.payload.id}`)
    }
  }

  const visibleUsers = users?.filter(u => u.id !== currentUser?.id)

  if (!visibleUsers || visibleUsers.length === 0) {
    return <p className={styles.empty}>Пользователи не найдены.</p>
  }

  return (
    <ul className={styles.list}>
      {visibleUsers.map(user => (
        <li className={styles.item} key={user.id}>
          <Avatar name={user.username} size={46} online={user.is_online} />
          <div className={styles.meta}>
            <span className={styles.name}>{user.username}</span>
            <span
              className={`${styles.status} ${user.is_online ? styles.online : ''}`}
            >
              {user.is_online ? 'в сети' : 'не в сети'}
            </span>
          </div>
          <button
            className={styles.msgBtn}
            title="Написать сообщение"
            onClick={() => handleCreatePrivateChat(user.id)}
          >
            <MdOutlineMessage />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default UsersList

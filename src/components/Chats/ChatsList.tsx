import { useEffect } from 'react'
import { selectChats } from '../../redux/Chats/ChatsSelectors'
import { DeleteChat, GetAllChats } from '../../redux/Chats/ChatsOperation'
import { selectChatId } from '../../redux/Chats/ChatsSlice'
import { selectUser } from '../../redux/Auth/AuthSelectors'
import { Link } from 'react-router-dom'
import styles from '../../styles/Chats/Chats.module.css'
import { getAvatarColor } from '../Users/UsersList'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'

interface ChatsListProps {
  onManage: () => void
}

const ChatsList = ({ onManage }: ChatsListProps) => {
  const dispatch = useTypificatedDispatch()
  const chats = useTypificatedSelector(selectChats)
  const currentUser = useTypificatedSelector(selectUser)

  useEffect(() => {
    dispatch(GetAllChats())
  }, [dispatch])

  return (
    <ul className={styles.ChatList}>
      {chats.map(chat => {
        const myParticipantInfo = chat.participants?.find(
          p => p.user_id === currentUser?.id
        )
        const isIAdmin = myParticipantInfo?.role === 'admin'
        const avatarName =
          chat.type === 'group'
            ? (chat.title ?? `Группа ${chat.id}`)
            : (chat.interlocutor_name ?? '?')
        const { bg, color } = getAvatarColor(avatarName)

        return (
          <li key={chat.id} className={styles.ChatLi}>
            <Link
              to={`/chat/${chat.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              className={styles.chatToLink}
            >
              <span style={{ background: bg, color }}>
                {avatarName.slice(0,1).toUpperCase()}
              </span>

              <h3 className={styles.userTitle}>
                {chat.type === 'group'
                  ? chat.title || `Группа ${chat.id}`
                  : chat.interlocutor_name}
              </h3>
            </Link>

            {chat.type === 'group' && (
              <>
                <button
                  className={styles.Manage}
                  onClick={() => {
                    dispatch(selectChatId(chat.id))
                    onManage()
                  }}
                >
                  Manage users
                </button>
                {isIAdmin && (
                  <button
                    className={styles.btnDelete}
                    onClick={e => {
                      e.stopPropagation()
                      dispatch(DeleteChat(chat.id))
                    }}
                    style={{ color: 'red' }}
                  >
                    Delete Group
                  </button>
                )}
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default ChatsList

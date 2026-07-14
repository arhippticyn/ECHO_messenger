import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LuSettings, LuTrash2 } from 'react-icons/lu'
import { selectChats } from '../../redux/Chats/ChatsSelectors'
import { DeleteChat, GetAllChats } from '../../redux/Chats/ChatsOperation'
import { selectChatId } from '../../redux/Chats/ChatsSlice'
import { selectUser } from '../../redux/Auth/AuthSelectors'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import Avatar from '../Avatar/Avatar'
import styles from './ChatsList.module.css'

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

  if (chats.length === 0) {
    return (
      <p className={styles.empty}>
        Пока нет чатов. Найдите пользователя во вкладке «Люди» и начните
        переписку.
      </p>
    )
  }

  return (
    <ul className={styles.list}>
      {chats.map(chat => {
        const myParticipantInfo = chat.participants?.find(
          p => p.user_id === currentUser?.id
        )
        const isAdmin = myParticipantInfo?.role === 'admin'
        const name =
          chat.type === 'group'
            ? chat.title || `Группа ${chat.id}`
            : chat.interlocutor_name || 'Диалог'

        return (
          <li key={chat.id} className={styles.item}>
            <NavLink
              to={`/chat/${chat.id}`}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              <Avatar name={name} size={46} />
              <div className={styles.meta}>
                <span className={styles.name}>{name}</span>
                <span className={styles.type}>
                  {chat.type === 'group'
                    ? `Группа · ${chat.participants?.length ?? 0} участников`
                    : 'Личный чат'}
                </span>
              </div>
            </NavLink>

            {chat.type === 'group' && (
              <div className={styles.actions}>
                <button
                  className={styles.actionBtn}
                  title="Управление участниками"
                  onClick={() => {
                    dispatch(selectChatId(chat.id))
                    onManage()
                  }}
                >
                  <LuSettings />
                </button>
                {isAdmin && (
                  <button
                    className={`${styles.actionBtn} ${styles.danger}`}
                    title="Удалить группу"
                    onClick={() => dispatch(DeleteChat(chat.id))}
                  >
                    <LuTrash2 />
                  </button>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default ChatsList

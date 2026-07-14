import { useParams, Link } from 'react-router-dom'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../hooks/reduxHooks'
import { useEffect, useRef } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import { selectChatId } from '../redux/Chats/ChatsSlice'
import { GetMessages, GetMessageStatus } from '../redux/Message/MessageOperation'
import {
  selectMessages,
  selectMessageStatus,
} from '../redux/Message/MessageSelectors'
import { selectUsers } from '../redux/Users/UserSelectors'
import { selectUser } from '../redux/Auth/AuthSelectors'
import { selectChats } from '../redux/Chats/ChatsSelectors'
import { GetAllChats } from '../redux/Chats/ChatsOperation'
import MessageSend from '../components/Message/MessageSend'
import MessageItem from '../components/Message/MessageItem'
import Avatar from '../components/Avatar/Avatar'
import styles from './Chat.module.css'

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>()
  const dispatch = useTypificatedDispatch()
  const messages = useTypificatedSelector(selectMessages)
  const users = useTypificatedSelector(selectUsers)
  const user = useTypificatedSelector(selectUser)
  const chats = useTypificatedSelector(selectChats)
  const messageStatus = useTypificatedSelector(selectMessageStatus)
  const listRef = useRef<HTMLUListElement>(null)
  const loadedStatusIds = useRef(new Set<number>())

  const chat = chats.find(c => c.id === Number(chatId))
  const chatName =
    chat?.type === 'group'
      ? chat.title || `Группа ${chat.id}`
      : chat?.interlocutor_name || 'Диалог'

  useEffect(() => {
    if (chats.length === 0) dispatch(GetAllChats())
  }, [chats.length, dispatch])

  useEffect(() => {
    if (chatId) {
      const id = Number(chatId)
      loadedStatusIds.current.clear()
      dispatch(selectChatId(id))
      dispatch(GetMessages(id))
    }
  }, [chatId, dispatch])

  useEffect(() => {
    if (!chatId) return
    messages.forEach(message => {
      if (message.sender_id !== user?.id) return
      if (loadedStatusIds.current.has(message.id)) return
      loadedStatusIds.current.add(message.id)
      dispatch(
        GetMessageStatus({ chat_id: Number(chatId), message_id: message.id })
      )
    })
  }, [messages, chatId, user?.id, dispatch])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages.length])

  return (
    <div className={styles.chat}>
      <header className={styles.header}>
        <Link to="/home" className={styles.backBtn} title="Назад">
          <LuArrowLeft />
        </Link>
        <Avatar name={chatName} size={38} />
        <div className={styles.headerMeta}>
          <span className={styles.chatName}>{chatName}</span>
          {chat?.type === 'group' && (
            <span className={styles.chatSub}>
              {chat.participants?.length ?? 0} участников
            </span>
          )}
        </div>
      </header>

      <ul className={styles.messages} ref={listRef}>
        {messages.length === 0 && (
          <p className={styles.empty}>Сообщений пока нет. Напишите первым!</p>
        )}
        {messages.map(message => {
          const author = users?.find(u => u.id === message.sender_id)
          const isOwn = message.sender_id === user?.id
          const displayName = isOwn
            ? user?.username
            : author?.username || 'Неизвестный'

          return (
            <MessageItem
              key={message.id}
              message={message}
              user={user}
              chatId={chatId}
              messageStatus={messageStatus}
              isOwn={isOwn}
              displayName={displayName ?? ''}
              showAuthor={chat?.type === 'group' && !isOwn}
            />
          )
        })}
      </ul>

      <MessageSend />
    </div>
  )
}

export default Chat

import { useParams } from 'react-router-dom'
import { useTypificatedDispatch, useTypificatedSelector } from '../hooks/reduxHooks'
import { useEffect } from 'react'
import { selectChatId } from '../redux/Chats/ChatsSlice'
import { DeleteMessage, GetMessages, GetMessageStatus } from '../redux/Message/MessageOperation'
import { selectMessages, selectMessageStatus } from '../redux/Message/MessageSelectors'
import { selectUsers } from '../redux/Users/UserSelectors'
import MessageSend from '../components/Message/MessageSend'
import { selectUser } from '../redux/Auth/AuthSelectors'
import { MdOutlineDelete } from 'react-icons/md'
import { SelectMessageId } from '../redux/Message/MessageSlice'
import { BsPencilSquare } from 'react-icons/bs'
import MessagePatch from '../components/Message/MessagePatch'
import { selectChats } from '../redux/Chats/ChatsSelectors'
import MessageItem from '../components/Message/MessageItem'

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>()
  const dispatch = useTypificatedDispatch()
  const messages = useTypificatedSelector(selectMessages)
  const users = useTypificatedSelector(selectUsers)
  const user = useTypificatedSelector(selectUser)
  const chats = useTypificatedSelector(selectChats)
  const messageStatus = useTypificatedSelector(selectMessageStatus)

  const chat = chats.find(chat => chat.id === Number(chatId))
  const participant = chat?.participants.find(p => p.user_id !== user?.id)
  const filterParticipant = users?.find(u => u.id === participant?.user_id)

  useEffect(() => {
    if (chatId) {
      const id = Number(chatId)
      dispatch(selectChatId(id))
      dispatch(GetMessages(id))
    }
  }, [chatId, dispatch])

  useEffect(() => {
    if (chatId && messages.length > 0) {
      messages.forEach(message => {
        dispatch(GetMessageStatus({ chat_id: Number(chatId), message_id: message.id }))
      })
    }
  }, [messages, chatId, dispatch])

  return (
    <div>
      {chat?.type === 'private' ? (
        <p>{filterParticipant?.username}</p>
      ) : (
        <p>{chat?.title}</p>
      )}

      <MessageSend />
      <MessagePatch />

      <ul>
        {messages.map(message => {
          const senderId = message.sender_id
          const author = users?.find(u => u.id === senderId)
          const displayName = author?.username || (user?.id === senderId ? user.username : 'Unknown User')
          const status = messageStatus?.find(s => s.message_id === message.id)?.status

          return (
            <MessageItem
              key={message.id}
              message={message}
              user={user}
              chatId={chatId}
              messageStatus={messageStatus}
            >
              <p><strong>{displayName}:</strong></p>

              {message.content && <p>{message.content}</p>}
              {message.file_url && (
                <img
                  src={`${import.meta.env.VITE_API_URL}${message.file_url}`}
                  alt="attachment"
                  style={{ maxWidth: '200px' }}
                />
              )}

              {status && <p>{status}</p>}

              {senderId === user?.id && (
                <>
                  <button onClick={() => dispatch(DeleteMessage({ chat_id: Number(chatId), id: message.id }))}>
                    <MdOutlineDelete />
                  </button>
                  <button onClick={() => dispatch(SelectMessageId(message.id))}>
                    <BsPencilSquare />
                  </button>
                </>
              )}
            </MessageItem>
          )
        })}
      </ul>
    </div>
  )
}

export default Chat
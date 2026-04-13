import { useParams } from 'react-router-dom'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../hooks/reduxHooks'
import { useEffect } from 'react'
import { selectChatId } from '../redux/Chats/ChatsSlice'
import { DeleteMessage, GetMessages } from '../redux/Message/MessageOperation'
import { selectMessages } from '../redux/Message/MessageSelectors'
import { selectUsers } from '../redux/Users/UserSelectors'
import MessageSend from '../components/Message/MessageSend'
import { selectUser } from '../redux/Auth/AuthSelectors'
import { MdOutlineDelete } from 'react-icons/md'

interface ChatProps {}

const Chat = ({}: ChatProps) => {
  const { chatId } = useParams<{ chatId: string }>()
  const dispatch = useTypificatedDispatch()
  const messages = useTypificatedSelector(selectMessages)
  const users = useTypificatedSelector(selectUsers)
  const user = useTypificatedSelector(selectUser)

  useEffect(() => {
    if (chatId) {
      const id = Number(chatId)
      dispatch(selectChatId(id))
      dispatch(GetMessages(id))
    }
  }, [chatId, dispatch])
  return (
    <div>
      <p>chat {chatId}</p>

      <MessageSend />

      <ul>
        {messages.map(message => {
          const senderId = message.sender_id || (message as any).sender_id

          const author = users?.find(u => u.id === senderId)

          const displayName =
            author?.username ||
            (user?.id === senderId ? user.username : 'Unknown User')

          return (
            <li key={message.id} style={{ marginBottom: '10px' }}>
              <p>
                <strong>{displayName}:</strong>
              </p>

              {message.content && <p>{message.content}</p>}
              {message.file_url && (
                <img
                  src={message.file_url}
                  alt="attachment"
                  style={{ maxWidth: '200px' }}
                />
              )}
              {senderId === user?.id && (
                <button
                  onClick={() =>
                    dispatch(
                      DeleteMessage({ chat_id: Number(chatId), id: message.id })
                    )
                  }
                >
                  <MdOutlineDelete />
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Chat

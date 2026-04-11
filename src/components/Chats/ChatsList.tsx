import { useEffect } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import {
  selectChats,
} from '../../redux/Chats/ChatsSelectors'
import { DeleteChat, GetAllChats } from '../../redux/Chats/ChatsOperation'
import { selectChatId } from '../../redux/Chats/ChatsSlice'
import { selectUser } from '../../redux/Auth/AuthSelectors'
import { Link } from 'react-router-dom'

interface ChatsListProps {}

const ChatsList = ({}: ChatsListProps) => {
  const dispatch = useTypificatedDispatch()
  const chats = useTypificatedSelector(selectChats)
  const currentUser = useTypificatedSelector(selectUser)

  useEffect(() => {
    dispatch(GetAllChats())
  }, [dispatch])

  return (
    <ul>
      {chats.map(chat => {
        const myParticipantInfo = chat.participants?.find(
          p => p.user_id === currentUser?.id
        )
        const isIAdmin = myParticipantInfo?.role === 'admin'

        return (
          <li
            key={chat.id}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '10px',
            }}
          >
            <Link
              to={`/chat/${chat.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3>
                {chat.type === 'group'
                  ? chat.title || `Группа ${chat.id}`
                  : chat.interlocutor_name}
              </h3>
            </Link>

            {chat.type === 'group' && (
              <>
                <button onClick={() => dispatch(selectChatId(chat.id))}>
                  Manage users
                </button>
                {isIAdmin && (
                  <button
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

import { useEffect } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { selectChats } from '../../redux/Chats/ChatsSelectors'
import { DeleteChat, GetAllChats } from '../../redux/Chats/ChatsOperation'
import { selectChatId } from '../../redux/Chats/ChatsSlice'

interface ChatsListProps {}

const ChatsList = ({}: ChatsListProps) => {
  const dispatch = useTypificatedDispatch()
  const chats = useTypificatedSelector(selectChats)

  useEffect(() => {
    dispatch(GetAllChats())
  }, [dispatch])
  return (
    <ul>
      {chats.map(chat => {
        return (
          <li key={chat.id}>
            {chat.type === 'group' ? (
              <>
                <h3>
                  {chat.type === 'group'
                    ? chat.title || `Group ${chat.id}`
                    : chat.interlocutor_name || 'Имя не пришло'}
                </h3>
                <button onClick={() => dispatch(selectChatId(chat.id))}>Add user</button>
              </>
            ) : (
              <>
                <h3>{chat.interlocutor_name}</h3>
              </>
            )}

            <button onClick={() => dispatch(DeleteChat(chat.id))}>
              delete chat
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ChatsList

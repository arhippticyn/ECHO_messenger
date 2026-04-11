import { useParams } from "react-router-dom"
import { useTypificatedDispatch } from "../hooks/reduxHooks"
import { useEffect } from "react"
import { selectChatId } from "../redux/Chats/ChatsSlice"

interface ChatProps {
    
}

const Chat = ({}: ChatProps) => {
    const {chatId} = useParams<{chatId: string}>()
    const dispatch = useTypificatedDispatch()

    useEffect(() => {
        if (chatId) {
            dispatch(selectChatId(Number(chatId)))
        }
    }, [chatId, dispatch])
    return (
        <div>
            <p>chat {chatId}</p>
        </div>
    )
}

export default Chat
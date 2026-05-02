import { useEffect, useRef } from 'react'
import { AddMessageStatus } from '../../redux/Message/MessageOperation'
import { MESSAGE_STATUS } from '../../types/status'
import { useTypificatedDispatch } from '../../hooks/reduxHooks'
import type { Message, MessageStatus } from '../../redux/Message/MessageSlice'

interface MessageItemProps {
  message: Message
  user: { id: number; username: string } | null
  chatId: string | undefined
  children: React.ReactNode
  messageStatus: MessageStatus[] | null
}

const MessageItem = ({
  message,
  user,
  chatId,
  children,
  messageStatus,
}: MessageItemProps) => {
  const ref = useRef<HTMLLIElement>(null)
  const dispatch = useTypificatedDispatch()

  useEffect(() => {
    if (message.sender_id === user?.id) return

    const alreadyRead = messageStatus?.find(
      s => s.message_id === message.id && s.status === MESSAGE_STATUS.READ
    )
    if (alreadyRead) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch(
            AddMessageStatus({
              chat_id: Number(chatId),
              message_id: message.id,
              type: MESSAGE_STATUS.READ,
            })
          )
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [message.id])

  return <li ref={ref}>{children}</li>
}

export default MessageItem

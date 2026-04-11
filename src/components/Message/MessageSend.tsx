import { useParams } from 'react-router-dom'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { selectUser } from '../../redux/Auth/AuthSelectors'
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { addMessage } from '../../redux/Message/MessageSlice'

interface MessageSendProps {}

interface FormValues {
  content: string
}

const MessageSend = ({}: MessageSendProps) => {
  const dispatch = useTypificatedDispatch()
  const user = useTypificatedSelector(selectUser)
  const { chatId } = useParams<{ chatId: string }>()
  const socketRef = useRef<WebSocket | null>(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: '' },
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (chatId) {
      const socket = new WebSocket(
        `wss://echo-bj2n.onrender.com/message/ws/${chatId}`
      )
      socketRef.current = socket

      socket.onopen = () => console.log('Соединение установлено')
      socket.onmessage = event => {
        const newMessage = JSON.parse(event.data)
        console.log('Новое сообщение:', newMessage)

        dispatch(addMessage(newMessage))
      }
      socket.onerror = error => console.log('Ошибка WebSocket:', error)

      return () => {
        socket.close()
      }
    }
  }, [chatId])

  const onSubmit = async (data: FormValues) => {
    if (socketRef.current?.readyState === WebSocket.OPEN && user) {
      const MessagePayload = {
        type: 'text',
        content: data.content,
        sender_id: user.id,
      }

      socketRef.current.send(JSON.stringify(MessagePayload))

      reset()
    } else {
      console.log('Соединение еще не готово или пользователь не авторизован')
    }
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('content', { required: true })}
        type="text"
        autoComplete="off"
        placeholder="Напишите сообщение..."
      />

      <button type="submit">Send</button>
    </form>
  )
}

export default MessageSend

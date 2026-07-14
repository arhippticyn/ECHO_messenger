import { useParams } from 'react-router-dom'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { selectUser } from '../../redux/Auth/AuthSelectors'
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { LuPaperclip, LuSendHorizontal } from 'react-icons/lu'
import { addMessage } from '../../redux/Message/MessageSlice'
import { UploadFileMessage } from '../../redux/Message/MessageOperation'
import { wsUrl } from '../../api/api'
import styles from './MessageSend.module.css'

interface FormValues {
  content: string
}

const MessageSend = () => {
  const dispatch = useTypificatedDispatch()
  const user = useTypificatedSelector(selectUser)
  const { chatId } = useParams<{ chatId: string }>()
  const socketRef = useRef<WebSocket | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { content: '' },
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!chatId) return
    const socket = new WebSocket(wsUrl(`/message/ws/${chatId}`))
    socketRef.current = socket

    socket.onmessage = event => {
      const newMessage = JSON.parse(event.data)
      dispatch(addMessage(newMessage))
    }
    socket.onerror = error => console.error('Ошибка WebSocket:', error)

    return () => {
      socket.close()
    }
  }, [chatId, dispatch])

  const onSubmit = (data: FormValues) => {
    if (!data.content.trim()) return
    if (socketRef.current?.readyState === WebSocket.OPEN && user?.id) {
      socketRef.current.send(
        JSON.stringify({
          type: 'text',
          content: data.content,
          sender_id: user.id,
        })
      )
      reset()
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !chatId) return

    const formData = new FormData()
    formData.append('file', file)
    dispatch(UploadFileMessage({ chat_id: Number(chatId), file: formData }))
    e.target.value = ''
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.fileInput}
        onChange={onFileChange}
      />
      <button
        type="button"
        className={styles.iconBtn}
        title="Прикрепить изображение"
        onClick={() => fileInputRef.current?.click()}
      >
        <LuPaperclip />
      </button>

      <input
        {...register('content')}
        type="text"
        autoComplete="off"
        placeholder="Напишите сообщение..."
        className={styles.input}
      />

      <button type="submit" className={styles.sendBtn} title="Отправить">
        <LuSendHorizontal />
      </button>
    </form>
  )
}

export default MessageSend

import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineDelete } from 'react-icons/md'
import { BsPencilSquare, BsCheck, BsCheckAll } from 'react-icons/bs'
import {
  AddMessageStatus,
  DeleteMessage,
  PatchMessage,
} from '../../redux/Message/MessageOperation'
import { MESSAGE_STATUS } from '../../types/status'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { SelectMessageId } from '../../redux/Message/MessageSlice'
import { selectPatchMessageId } from '../../redux/Message/MessageSelectors'
import type { Message, MessageStatus } from '../../redux/Message/MessageSlice'
import type { UserType } from '../../redux/Auth/AuthOperation'
import { BACKEND_URL } from '../../api/api'
import styles from './MessageItem.module.css'

interface MessageItemProps {
  message: Message
  user: UserType | null
  chatId: string | undefined
  messageStatus: MessageStatus[] | null
  isOwn: boolean
  displayName: string
  showAuthor: boolean
}

const MessageItem = ({
  message,
  user,
  chatId,
  messageStatus,
  isOwn,
  displayName,
  showAuthor,
}: MessageItemProps) => {
  const ref = useRef<HTMLLIElement>(null)
  const dispatch = useTypificatedDispatch()
  const patchId = useTypificatedSelector(selectPatchMessageId)
  const isEditing = patchId === message.id

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { new_content: message.content ?? '' },
  })

  useEffect(() => {
    if (isEditing) reset({ new_content: message.content ?? '' })
  }, [isEditing, message.content, reset])

  useEffect(() => {
    if (isOwn) return

    const alreadyRead = messageStatus?.find(
      s =>
        s.message_id === message.id &&
        s.user_id === user?.id &&
        s.status === MESSAGE_STATUS.READ
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

  const statuses = messageStatus?.filter(
    s => s.message_id === message.id && s.user_id !== user?.id
  )
  const isRead = statuses?.some(s => s.status === MESSAGE_STATUS.READ)

  const onEditSubmit = (data: { new_content: string }) => {
    dispatch(
      PatchMessage({
        chat_id: Number(chatId),
        id: message.id,
        new_content: data.new_content,
      })
    )
    dispatch(SelectMessageId(null))
  }

  return (
    <li
      ref={ref}
      className={`${styles.row} ${isOwn ? styles.own : styles.other}`}
    >
      <div className={styles.bubble}>
        {showAuthor && <span className={styles.author}>{displayName}</span>}

        {isEditing ? (
          <form
            className={styles.editForm}
            onSubmit={handleSubmit(onEditSubmit)}
          >
            <input
              {...register('new_content', { required: true })}
              className={styles.editInput}
              autoFocus
            />
            <div className={styles.editActions}>
              <button type="submit" className={styles.editSave}>
                Сохранить
              </button>
              <button
                type="button"
                className={styles.editCancel}
                onClick={() => dispatch(SelectMessageId(null))}
              >
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <>
            {message.content && (
              <p className={styles.text}>{message.content}</p>
            )}
            {message.file_url && (
              <img
                src={`${BACKEND_URL}${message.file_url}`}
                alt="Вложение"
                className={styles.image}
                loading="lazy"
              />
            )}
          </>
        )}

        {isOwn && !isEditing && (
          <span className={styles.footer}>
            <span className={styles.ticks}>
              {isRead ? <BsCheckAll /> : <BsCheck />}
            </span>
          </span>
        )}
      </div>

      {isOwn && !isEditing && (
        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            title="Редактировать"
            onClick={() => dispatch(SelectMessageId(message.id))}
          >
            <BsPencilSquare />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.danger}`}
            title="Удалить"
            onClick={() =>
              dispatch(
                DeleteMessage({ chat_id: Number(chatId), id: message.id })
              )
            }
          >
            <MdOutlineDelete />
          </button>
        </div>
      )}
    </li>
  )
}

export default MessageItem

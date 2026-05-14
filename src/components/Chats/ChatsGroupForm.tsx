import { useForm } from 'react-hook-form'
import { useTypificatedDispatch, useTypificatedSelector } from '../../hooks/reduxHooks'
import { selectUsers } from '../../redux/Users/UserSelectors'
import { CreateGroupChat } from '../../redux/Chats/ChatsOperation'
import { useEffect } from 'react'
import { GetUsersBySearch } from '../../redux/Users/UsersOperation'
import { getAvatarColor } from '../Users/UsersList' 
import styles from '../../styles/Chats/Chats.module.css'
import { createPortal } from 'react-dom'

interface ChatsGroupFormProps {
  onClose: () => void
}

const ChatsGroupForm = ({ onClose }: ChatsGroupFormProps) => {
  const dispatch = useTypificatedDispatch()
  const users = useTypificatedSelector(selectUsers)

  useEffect(() => {
    dispatch(GetUsersBySearch())
  }, [dispatch])

  const { register, handleSubmit, watch, setValue } = useForm<{
    title: string
    participants: number[]
  }>({
    defaultValues: { title: '', participants: [] },
  })

  const selected = watch('participants')

  const toggleUser = (id: number) => {
    const current = selected ?? []
    const next = current.includes(id)
      ? current.filter(p => p !== id)
      : [...current, id]
    setValue('participants', next)
  }

  const onSubmit = (data: { title: string; participants: number[] }) => {
    dispatch(CreateGroupChat(data))
    onClose()
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.title}>Новая группа</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.body}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Название группы</label>
              <input
                {...register('title', { required: true })}
                type="text"
                className={styles.input}
                placeholder="Введите название..."
              />
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.fieldHeader}>
                <label className={styles.label}>Участники</label>
                <span className={styles.count}>Выбрано: {selected?.length ?? 0}</span>
              </div>
              <div className={styles.usersList}>
                {users?.map(user => {
                  const { bg, color } = getAvatarColor(user.username)
                  const isSelected = selected?.includes(user.id)
                  return (
                    <div
                      key={user.id}
                      className={`${styles.userItem} ${isSelected ? styles.selected : ''}`}
                      onClick={() => toggleUser(user.id)}
                    >
                      <div className={styles.avatar} style={{ background: bg, color }}>
                        {user.username[0].toUpperCase()}
                      </div>
                      <span className={styles.userName}>{user.username}</span>
                      <span className={`${styles.badge} ${user.is_online ? styles.online : styles.offline}`}>
                        {user.is_online ? 'онлайн' : 'офлайн'}
                      </span>
                      {isSelected && <span className={styles.check}>✓</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>Отмена</button>
            <button type="submit" className={styles.btnCreate}>Создать группу</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default ChatsGroupForm
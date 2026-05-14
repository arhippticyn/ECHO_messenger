import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../../../styles/Chats/Chats.module.css'
import { useTypificatedDispatch, useTypificatedSelector } from '../../../hooks/reduxHooks'
import { selectUsers } from '../../../redux/Users/UserSelectors'
import { selectChatId, selectChats } from '../../../redux/Chats/ChatsSelectors'
import { GetUsersBySearch } from '../../../redux/Users/UsersOperation'
import { AddUsersGroupO, CreateGroupChat, DeleteUsersGroupO } from '../../../redux/Chats/ChatsOperation'
import { getAvatarColor } from '../../Users/UsersList'

type Tab = 'create' | 'add' | 'remove'

interface Props {
  onClose: () => void
}

const GroupManageModal = ({ onClose }: Props) => {
  const dispatch = useTypificatedDispatch()
  const users = useTypificatedSelector(selectUsers)
  const chat_id = useTypificatedSelector(selectChatId)
  const chats = useTypificatedSelector(selectChats)
  const [tab, setTab] = useState<Tab>('create')

  const chat = chats.find(c => c.id === chat_id)

  useEffect(() => {
    dispatch(GetUsersBySearch(null))
  }, [dispatch])

  const createForm = useForm<{ title: string; participants: number[] }>({
    defaultValues: { title: '', participants: [] },
  })
  const addForm = useForm<{ participant: string }>({
    defaultValues: { participant: '' },
  })
  const removeForm = useForm<{ participant: string }>({
    defaultValues: { participant: '' },
  })

  const selected = createForm.watch('participants')

  const toggleUser = (id: number) => {
    const current = selected ?? []
    const next = current.includes(id)
      ? current.filter(p => p !== id)
      : [...current, id]
    createForm.setValue('participants', next)
  }

  const onCreateSubmit = (data: { title: string; participants: number[] }) => {
    dispatch(CreateGroupChat(data))
    onClose()
  }

  const onAddSubmit = (data: { participant: string }) => {
    if (!chat_id) return
    dispatch(AddUsersGroupO({ chat_id, user_id: Number(data.participant) }))
    onClose()
  }

  const onRemoveSubmit = (data: { participant: string }) => {
    if (!chat_id) return
    dispatch(DeleteUsersGroupO({ chat_id, user_id: Number(data.participant) }))
    onClose()
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          <span className={styles.title}>Управление группой</span>
          <button type="button" className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.tabs}>
          {(['create', 'add', 'remove'] as Tab[]).map(t => (
            <button
              key={t}
              type="button"
              className={`${styles.tab} ${tab === t ? styles.activeTab : ''}`}
              onClick={() => setTab(t)}
            >
              {{ create: 'Создать', add: 'Добавить', remove: 'Удалить' }[t]}
            </button>
          ))}
        </div>

        {tab === 'create' && (
          <form onSubmit={createForm.handleSubmit(onCreateSubmit)}>
            <div className={styles.body}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Название группы</label>
                <input {...createForm.register('title', { required: true })} className={styles.input} placeholder="Введите название..." />
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
                      <div key={user.id} className={`${styles.userItem} ${isSelected ? styles.selected : ''}`} onClick={() => toggleUser(user.id)}>
                        <div className={styles.avatar} style={{ background: bg, color }}>{user.username[0].toUpperCase()}</div>
                        <span className={styles.userName}>{user.username}</span>
                        <span className={`${styles.badge} ${user.is_online ? styles.online : styles.offline}`}>{user.is_online ? 'онлайн' : 'офлайн'}</span>
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
        )}

        {tab === 'add' && (
          <form onSubmit={addForm.handleSubmit(onAddSubmit)}>
            <div className={styles.body}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Выберите пользователя</label>
                <div className={styles.usersList}>
                  {users?.map(user => {
                    const { bg, color } = getAvatarColor(user.username)
                    const val = addForm.watch('participant')
                    const isSelected = val === String(user.id)
                    return (
                      <div key={user.id} className={`${styles.userItem} ${isSelected ? styles.selected : ''}`} onClick={() => addForm.setValue('participant', String(user.id))}>
                        <div className={styles.avatar} style={{ background: bg, color }}>{user.username[0].toUpperCase()}</div>
                        <span className={styles.userName}>{user.username}</span>
                        <span className={`${styles.badge} ${user.is_online ? styles.online : styles.offline}`}>{user.is_online ? 'онлайн' : 'офлайн'}</span>
                        {isSelected && <span className={styles.check}>✓</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <button type="button" className={styles.btnCancel} onClick={onClose}>Отмена</button>
              <button type="submit" className={styles.btnCreate}>Добавить</button>
            </div>
          </form>
        )}

        {tab === 'remove' && (
          <form onSubmit={removeForm.handleSubmit(onRemoveSubmit)}>
            <div className={styles.body}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Участники группы</label>
                <div className={styles.usersList}>
                  {chat?.participants?.map(participant => {
                    const user = users?.find(u => u.id === participant.user_id)
                    const { bg, color } = getAvatarColor(user?.username ?? '')
                    const val = removeForm.watch('participant')
                    const isSelected = val === String(participant.user_id)
                    return (
                      <div key={participant.user_id} className={`${styles.userItem} ${isSelected ? styles.selectedDanger : ''}`} onClick={() => removeForm.setValue('participant', String(participant.user_id))}>
                        <div className={styles.avatar} style={{ background: bg, color }}>{(user?.username ?? '?')[0].toUpperCase()}</div>
                        <span className={styles.userName}>{user?.username ?? `User ${participant.user_id}`}</span>
                        {isSelected && <span className={styles.check} style={{ color: '#a32d2d' }}>✓</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <button type="button" className={styles.btnCancel} onClick={onClose}>Отмена</button>
              <button type="submit" className={`${styles.btnCreate} ${styles.btnDanger}`}>Удалить</button>
            </div>
          </form>
        )}

      </div>
    </div>,
    document.body
  )
}

export default GroupManageModal
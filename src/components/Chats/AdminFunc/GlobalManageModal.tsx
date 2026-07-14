import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'

import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../../hooks/reduxHooks'
import { selectUsers } from '../../../redux/Users/UserSelectors'
import { selectUser } from '../../../redux/Auth/AuthSelectors'
import {
  selectChatId,
  selectChats,
} from '../../../redux/Chats/ChatsSelectors'
import { GetUsersBySearch } from '../../../redux/Users/UsersOperation'
import {
  AddUsersGroupO,
  DeleteUsersGroupO,
} from '../../../redux/Chats/ChatsOperation'
import Avatar from '../../Avatar/Avatar'
import styles from '../Modal.module.css'

type Tab = 'add' | 'remove'

interface Props {
  onClose: () => void
}

const GroupManageModal = ({ onClose }: Props) => {
  const dispatch = useTypificatedDispatch()
  const users = useTypificatedSelector(selectUsers)
  const currentUser = useTypificatedSelector(selectUser)
  const chat_id = useTypificatedSelector(selectChatId)
  const chats = useTypificatedSelector(selectChats)
  const [tab, setTab] = useState<Tab>('add')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const chat = chats.find(c => c.id === chat_id)
  const isAdmin =
    chat?.participants?.find(p => p.user_id === currentUser?.id)?.role ===
    'admin'

  useEffect(() => {
    dispatch(GetUsersBySearch(null))
  }, [dispatch])

  const switchTab = (t: Tab) => {
    setTab(t)
    setSelectedUserId(null)
  }

  const handleSubmit = () => {
    if (!chat_id || selectedUserId === null) return
    if (tab === 'add') {
      dispatch(AddUsersGroupO({ chat_id, user_id: selectedUserId }))
    } else {
      dispatch(DeleteUsersGroupO({ chat_id, user_id: selectedUserId }))
    }
    onClose()
  }

  const notInGroup = users?.filter(
    u => !chat?.participants?.some(p => p.user_id === u.id)
  )

  const removableParticipants = chat?.participants?.filter(
    p => p.user_id !== currentUser?.id
  )

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>
            {chat?.title || 'Управление группой'}
          </span>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {isAdmin && (
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${tab === 'add' ? styles.activeTab : ''}`}
              onClick={() => switchTab('add')}
            >
              Добавить
            </button>
            <button
              type="button"
              className={`${styles.tab} ${tab === 'remove' ? styles.activeTab : ''}`}
              onClick={() => switchTab('remove')}
            >
              Удалить
            </button>
          </div>
        )}

        <div className={styles.body}>
          {tab === 'add' ? (
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Выберите пользователя</label>
              <div className={styles.usersList}>
                {notInGroup?.length === 0 && (
                  <p className={styles.hint}>Все пользователи уже в группе.</p>
                )}
                {notInGroup?.map(user => {
                  const isSelected = selectedUserId === user.id
                  return (
                    <div
                      key={user.id}
                      className={`${styles.userItem} ${isSelected ? styles.selected : ''}`}
                      onClick={() => setSelectedUserId(user.id)}
                    >
                      <Avatar name={user.username} size={32} />
                      <span className={styles.userName}>{user.username}</span>
                      <span
                        className={`${styles.badge} ${user.is_online ? styles.online : styles.offline}`}
                      >
                        {user.is_online ? 'онлайн' : 'офлайн'}
                      </span>
                      {isSelected && <span className={styles.check}>✓</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Участники группы</label>
              <div className={styles.usersList}>
                {removableParticipants?.length === 0 && (
                  <p className={styles.hint}>
                    В группе нет других участников.
                  </p>
                )}
                {removableParticipants?.map(participant => {
                  const user = users?.find(u => u.id === participant.user_id)
                  const name =
                    user?.username ?? `User ${participant.user_id}`
                  const isSelected = selectedUserId === participant.user_id
                  return (
                    <div
                      key={participant.user_id}
                      className={`${styles.userItem} ${isSelected ? styles.selectedDanger : ''}`}
                      onClick={() => setSelectedUserId(participant.user_id)}
                    >
                      <Avatar name={name} size={32} />
                      <span className={styles.userName}>{name}</span>
                      {participant.role === 'admin' && (
                        <span className={`${styles.badge} ${styles.offline}`}>
                          админ
                        </span>
                      )}
                      {isSelected && (
                        <span
                          className={`${styles.check} ${styles.checkDanger}`}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            Отмена
          </button>
          <button
            type="button"
            className={`${styles.btnPrimary} ${tab === 'remove' ? styles.btnDanger : ''}`}
            disabled={selectedUserId === null}
            onClick={handleSubmit}
          >
            {tab === 'add' ? 'Добавить' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default GroupManageModal

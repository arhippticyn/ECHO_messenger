import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CiLogout } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { LuUsers, LuMessageSquare, LuPlus } from 'react-icons/lu'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { selectUser } from '../../redux/Auth/AuthSelectors'
import { LogOut } from '../../redux/Auth/AuthOperation'
import { GetUsersBySearch } from '../../redux/Users/UsersOperation'
import ChatsList from '../Chats/ChatsList'
import UsersList from '../Users/UsersList'
import ChatsGroupForm from '../Chats/ChatsGroupForm'
import GroupManageModal from '../Chats/AdminFunc/GlobalManageModal'
import Avatar from '../Avatar/Avatar'
import styles from './Sidebar.module.css'

type Tab = 'chats' | 'users'

const Sidebar = () => {
  const dispatch = useTypificatedDispatch()
  const navigate = useNavigate()
  const user = useTypificatedSelector(selectUser)
  const [tab, setTab] = useState<Tab>('chats')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isManageOpen, setIsManageOpen] = useState(false)

  useEffect(() => {
    dispatch(GetUsersBySearch(null))
  }, [dispatch])

  const { register, handleSubmit } = useForm({
    defaultValues: { search: '' },
  })

  const onSearch = (data: { search: string }) => {
    dispatch(GetUsersBySearch(data.search))
    setTab('users')
  }

  const handleLogOut = async () => {
    await dispatch(LogOut())
    navigate('/')
  }

  return (
    <div className={styles.sidebar}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <Avatar name={user?.username ?? ''} size={38} />
          <div className={styles.userMeta}>
            <span className={styles.appName}>echo</span>
            <span className={styles.username}>{user?.username}</span>
          </div>
        </div>
        <button
          className={styles.iconBtn}
          onClick={handleLogOut}
          title="Выйти"
        >
          <CiLogout />
        </button>
      </header>

      <form className={styles.search} onSubmit={handleSubmit(onSearch)}>
        <FaSearch className={styles.searchIcon} />
        <input
          {...register('search')}
          type="text"
          placeholder="Поиск пользователей"
          className={styles.searchInput}
        />
      </form>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'chats' ? styles.activeTab : ''}`}
          onClick={() => setTab('chats')}
        >
          <LuMessageSquare /> Чаты
        </button>
        <button
          className={`${styles.tab} ${tab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setTab('users')}
        >
          <LuUsers /> Люди
        </button>
      </nav>

      <div className={styles.listArea}>
        {tab === 'chats' ? (
          <ChatsList onManage={() => setIsManageOpen(true)} />
        ) : (
          <UsersList />
        )}
      </div>

      <button
        className={styles.fab}
        onClick={() => setIsCreateOpen(true)}
        title="Создать группу"
      >
        <LuPlus />
      </button>

      {isCreateOpen && <ChatsGroupForm onClose={() => setIsCreateOpen(false)} />}
      {isManageOpen && (
        <GroupManageModal onClose={() => setIsManageOpen(false)} />
      )}
    </div>
  )
}

export default Sidebar

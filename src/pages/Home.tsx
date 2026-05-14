import { useEffect, useState } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../hooks/reduxHooks'
import { selectToken, selectUser } from '../redux/Auth/AuthSelectors'
import { GetAccess, GetUser, LogOut } from '../redux/Auth/AuthOperation'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/Users/UserForm'
import UsersList from '../components/Users/UsersList'
import ChatsGroupForm from '../components/Chats/ChatsGroupForm'
import ChatsList from '../components/Chats/ChatsList'
import AddUsersGroup from '../components/Chats/AdminFunc/AddUsersGroup'
import DeleteUsersGroup from '../components/Chats/AdminFunc/DeleteUsersGroup'
import styles from '../styles/Chats/Chats.module.css'
import { CiLogout } from 'react-icons/ci'
import GroupManageModal from '../components/Chats/AdminFunc/GlobalManageModal'

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const dispatch = useTypificatedDispatch()
  const user = useTypificatedSelector(selectUser)
  const token = useTypificatedSelector(selectToken)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [devIsOpen, setDevIsOpen] = useState(false)

  useEffect(() => {
    dispatch(GetUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(GetAccess())
  }, [])

  useEffect(() => {
    if (!token) return
    const onlineStatus = new WebSocket(
      `wss://echo-bj2n.onrender.com/profile/online?token=${token}`
    )
    onlineStatus.onopen = () => console.log('Connected')
    onlineStatus.onerror = e => console.log('Error:', e)
    return () => onlineStatus.close()
  }, [token])

  const handleLogOut = async () => {
    await dispatch(LogOut())
    navigate('/')
  }
  return (
    <div className={styles.homeUserPage}>
      <div className={styles.header}>
        <h1>Echo</h1>
        {/* <p>{user.username}</p> */}
        {/* <span>{user?.is_online ? 'Online' : 'Offline'}</span> */}
        <button className="" onClick={handleLogOut}>
          <CiLogout />
        </button>
      </div>

      <UserForm />
      <button  className={styles.btnOpen} onClick={() => setIsOpen(true)}>Создать группу</button>

      {isOpen && <ChatsGroupForm onClose={() => setIsOpen(false)} />}

      <h2 style={{ paddingLeft: '10px' }}>Пользователи</h2>
      <UsersList />
      <h2 style={{ paddingLeft: '10px' }}>Чаты</h2>
      <ChatsList onManage={() => setDevIsOpen(true)} />

      {devIsOpen && <GroupManageModal onClose={() => setIsOpen(false)} />}
    </div>
  )
}

export default Home

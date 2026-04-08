import { useEffect } from 'react'
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

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const dispatch = useTypificatedDispatch()
  const user = useTypificatedSelector(selectUser)
  const token = useTypificatedSelector(selectToken)
  const navigate = useNavigate()

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
    <div>
      Hello, {user.username}, your email: {user.email}
      Your status: {user?.is_online ? 'Online' : 'Offline'}
      <button className="" onClick={handleLogOut}>
        Log Out
      </button>

      <UserForm />
      <UsersList />

      <ChatsGroupForm />
      <ChatsList />

      <AddUsersGroup />
    </div>
  )
}

export default Home
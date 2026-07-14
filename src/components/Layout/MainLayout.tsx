import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { selectToken } from '../../redux/Auth/AuthSelectors'
import { GetAccess, GetUser } from '../../redux/Auth/AuthOperation'
import { wsUrl } from '../../api/api'
import Sidebar from './Sidebar'
import styles from './MainLayout.module.css'

const MainLayout = () => {
  const dispatch = useTypificatedDispatch()
  const token = useTypificatedSelector(selectToken)
  const location = useLocation()
  const isChatOpen = location.pathname.startsWith('/chat')

  useEffect(() => {
    dispatch(GetUser())
    dispatch(GetAccess())
  }, [dispatch])

  useEffect(() => {
    if (!token) return
    const onlineStatus = new WebSocket(wsUrl(`/profile/online?token=${token}`))
    onlineStatus.onerror = e => console.error('Online WS error:', e)
    return () => onlineStatus.close()
  }, [token])

  return (
    <div className={`${styles.layout} ${isChatOpen ? styles.chatOpen : ''}`}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout

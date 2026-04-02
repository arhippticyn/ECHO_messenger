import { useEffect } from "react"
import { useTypificatedDispatch, useTypificatedSelector } from "../hooks/reduxHooks"
import { selectToken, selectUser } from "../redux/Auth/AuthSelectors"
import { GetAccess, GetUser } from "../redux/Auth/AuthOperation"

interface HomeProps {
    
}

const Home = ({}: HomeProps) => {
    const dispatch = useTypificatedDispatch()
    const user = useTypificatedSelector(selectUser)
    const token = useTypificatedSelector(selectToken)

    useEffect(() => {
        dispatch(GetUser())
    }, [dispatch])

        useEffect(() => {
        dispatch(GetAccess())
        if (!token) return
        const onlineStatus = new WebSocket(`wss://echo-bj2n.onrender.com/profile/online?token=${token}`)
        onlineStatus.onopen = () => console.log('Connected')
        onlineStatus.onerror = (e) => console.log('Error:', e)
        return () => onlineStatus.close()
    },[token])
    return (
        <div>
            Hello, {user.username}, your email: {user.email}
        </div>
    )
}

export default Home
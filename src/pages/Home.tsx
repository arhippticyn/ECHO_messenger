import { useEffect } from "react"
import { useTypificatedDispatch, useTypificatedSelector } from "../hooks/reduxHooks"
import { selectUser } from "../redux/Auth/AuthSelectors"
import { GetUser } from "../redux/Auth/AuthOperation"

interface HomeProps {
    
}

const Home = ({}: HomeProps) => {
    const dispatch = useTypificatedDispatch()
    const user = useTypificatedSelector(selectUser)

    useEffect(() => {
        dispatch(GetUser())
    }, [dispatch])
    return (
        <div>
            Hello, {user.username}, your email: {user.email}
        </div>
    )
}

export default Home
import { useTypificatedSelector } from "../../hooks/reduxHooks"
import { selectUsers } from "../../redux/Users/UserSelectors"

interface UsersListProps {
    
}

const UsersList = ({}: UsersListProps) => {
    const users = useTypificatedSelector(selectUsers)

    return (
        <ul>
            {users?.map(user => {
                return (
                    <li key={user.id}>
                        <h4>{user.username}</h4>
                        <p>{user.is_online ? 'online' : 'offline'}</p>
                    </li>
                )
            })}
        </ul>
    )
}

export default UsersList
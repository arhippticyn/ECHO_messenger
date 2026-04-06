import { useTypificatedDispatch, useTypificatedSelector } from "../../hooks/reduxHooks"
import { selectUserId } from "../../redux/Users/UserSelectors"

interface ChatsPrivateFormProps {
    
}

const ChatsPrivateForm = ({}: ChatsPrivateFormProps) => {
    const dispatch = useTypificatedDispatch()
    const userIdPart = useTypificatedSelector(selectUserId)
    
    return (
        <form action="">
            
        </form>
    )
}

export default ChatsPrivateForm
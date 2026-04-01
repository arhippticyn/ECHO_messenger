import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

interface AuthProps {}

const Auth = ({}: AuthProps) => {
  return (
    <div>
      <Register />
      <Login />
    </div>
  )
}

export default Auth

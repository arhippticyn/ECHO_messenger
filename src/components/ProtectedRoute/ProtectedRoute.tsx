import type React from "react"
import { useTypificatedDispatch } from "../../hooks/reduxHooks"
import { useEffect, useState } from "react"
import { GetUser, RefreshToAccess } from "../../redux/Auth/AuthOperation"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const dispatch = useTypificatedDispatch()
    const [isVerified, setIsVerified] = useState<boolean | null>(null)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                await dispatch(GetUser()).unwrap()
                setIsVerified(true)
            } catch {
                try {
                    await dispatch(RefreshToAccess()).unwrap()
                    setIsVerified(true)
                } catch {
                    setIsVerified(false)
                }
            }
        }

        verifyUser()
    }, [dispatch])

    if (isVerified === false) return <Navigate to="/" replace={true} />;
    return (
        children
    )
}

export default ProtectedRoute
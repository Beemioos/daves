import { useSelector } from 'react-redux'
import { selectCurrent } from '../features/userSlice'
import { Navigate } from 'react-router-dom'

const SellerGuard = ({ children }: { children: JSX.Element }) => {
    const user = useSelector(selectCurrent)

    if (!user) {
        return <div>Loading...</div>
    }

    if (user.role !== 'seller') {
        return <Navigate to="/admin" />
    }

    return children
}

export default SellerGuard

// features/AdminGuard.tsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectCurrent } from '../features/userSlice'

const AdminGuard = ({ children }: { children: JSX.Element }) => {
    const user = useSelector(selectCurrent)

    // Если данные пользователя еще загружаются
    if (!user) {
        return <div>Loading...</div>
    }

    // Если роль пользователя не является администратором, перенаправляем
    if (user.role !== 'admin') {
        return <Navigate to="/" />
    }

    // Если все проверки пройдены, отображаем дочерние элементы
    return children
}

export default AdminGuard

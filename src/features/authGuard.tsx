import { Navigate, useLocation } from 'react-router-dom'
import { useCurrentQuery } from '../app/services/userApi'
import Loading from '../components/Loading/Loading'

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
	const { isLoading, data } = useCurrentQuery()
	const location = useLocation()

	if (isLoading) {
		return <Loading />
	}

	if (data?.role === 'admin' && location.pathname !== '/admin') {
		return <Navigate to='/admin' />
	}

	if (data?.role === 'seller' && location.pathname === '/admin') {
		return <Navigate to='/' />
	}

	return children
}

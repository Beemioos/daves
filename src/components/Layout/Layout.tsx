import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../features/userSlice'
import { ThemeContext } from '../../theme-privider'
import Container from '../Container/Container'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import './Layout.scss'

const Layout = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const { theme } = useContext(ThemeContext)

	const navigate = useNavigate()
	const [isAdmin] = useState(false)
	const [isMobiled, setIsMobiled] = useState(false)
	const [isNavVisible, setIsNavVisible] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobiled(window.innerWidth <= 921)
		}
		const isMobileDevice = window.innerWidth <= 921
		setIsMobiled(isMobileDevice)

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/auth')
		}
	}, [isAuthenticated, navigate])

	const toggleNavBar = () => {
		setIsNavVisible(!isNavVisible)
	}

	return (
		<div>
			<Header />
			{isMobiled && (
				<button className='menu-button' onClick={toggleNavBar}>
					<div className={`burger-icon ${isNavVisible ? 'open' : ''}`}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>
			)}
			<Container>
				<div
					className={`flex-2 p-4 transition-transform duration-300 ${
						isMobiled
							? isNavVisible
								? 'translate-x-0'
								: '-translate-x-full'
							: ''
					} ${
						isMobiled ? (theme === 'dark' ? 'bg-zinc-900' : ' bg-white') : ''
					}`}
					style={
						isMobiled
							? {
									position: 'fixed',
									left: 0,
									top: 0,
									height: '100%',
									width: '180px',
									zIndex: 1500,
									transition: 'transform 0.3s ease-in-out',
							  }
							: {}
					}
				>
					<div className='flex-2 p-4 ml-40'>
						<NavBar
							isNavVisible={isNavVisible}
							setIsNavVisible={setIsNavVisible}
							isAdmin={isAdmin}
						/>
					</div>
				</div>
				<div
					className={`flex-1 ${
						isMobiled ? 'justify-center p-2 items-center flex-col' : 'p-4'
					}`}
				>
					<Outlet />
				</div>
			</Container>
		</div>
	)
}

export default Layout

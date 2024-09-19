import { useContext } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { LuSunMedium } from 'react-icons/lu'
import { ThemeContext } from '../../theme-privider'
// import { PiScalesLight } from 'react-icons/pi'

const Header = () => {
	const { theme, toggleTheme } = useContext(ThemeContext)
	return (
		<header className='w-full h-[70px] flex items-center justify-end px-10'>

			<div onClick={() => toggleTheme()}>
				{theme === 'light' ? (
					<FaRegMoon size={26} />
				) : (
					<LuSunMedium size={26} />
				)}
			</div>
		</header>
	)
}

export default Header

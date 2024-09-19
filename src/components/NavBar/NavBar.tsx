import { useContext } from 'react'
import { AiOutlineProduct } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { GoHistory, GoPlusCircle } from 'react-icons/go'
import { ThemeContext } from '../../theme-privider'
import NavButton from '../NavButton/NavButton'

interface INavBar {
	isAdmin: boolean
	isNavVisible: boolean
	setIsNavVisible: (arg: boolean) => void
}

const NavBar = ({ isAdmin,isNavVisible,setIsNavVisible}: INavBar) => {
	const { theme } = useContext(ThemeContext)

	return (
		<div>
			<nav className=' fixed left-0 top-40 w-40 z-10 flex flex-col h-[70vh] justify-between items-center '>
				<ul className='flex flex-col h-52 justify-between items-center'>
					<li
						className={`${
							theme === 'light'
								? 'hover:bg-yellow-900 hover:text-white transition-all duration-300'
								: 'hover:bg-white hover:text-black transition-all duration-300'
						} p-4 rounded-2xl `}
					>
						<NavButton onClick={()=>setIsNavVisible(!isNavVisible)} icon={<GoPlusCircle size={22} />} path='/'>
							Создать
						</NavButton>
					</li>
					<li>
						<NavButton onClick={()=>setIsNavVisible(!isNavVisible)} icon={<AiOutlineProduct size={22} />} path='/orders'>
							Заказы
						</NavButton>
					</li>
					<li>
						<NavButton onClick={()=>setIsNavVisible(!isNavVisible)} icon={<GoHistory size={22} />} path='/history'>
							История
						</NavButton>
					</li>
					{isAdmin ? (
						<li>
							<NavButton path='/addproduct'>Добавить продукт</NavButton>
						</li>
					) : null}
				</ul>
				<NavButton onClick={()=>setIsNavVisible(!isNavVisible)} className='' path='/profile'>
					<CgProfile
						size={30}
						className='transition-all duration-300 active:text-white'
					/>
				</NavButton>
			</nav>
		</div>
	)
}

export default NavBar

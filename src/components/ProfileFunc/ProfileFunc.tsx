import { useContext, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, selectCurrent } from '../../features/userSlice'
import { ThemeContext } from '../../theme-privider'
import MyButton from '../MyButton/MyButton'
import ProfileField from '../ProfileField/ProfileField'
import ProfileForm from '../ProfileForm/ProfileFrom'
import './ProfileFunc.scss'

const ProfileFunc = () => {
	const { theme } = useContext(ThemeContext)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const current = useSelector(selectCurrent)
	const [isEditing, setIsEditing] = useState(false)
	const handleLogout = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate('/auth')
	}

	if (!current) {
		return null
	}

	const { email, login, inn, name, status, password, ogrnip, phone, ogrn } =
		current

	const handleEditClick = () => {
		setIsEditing(true)
	}

	return (
		<div>
			<div className='main-cont'>
				<div className='prof'>
					<div className='w-40 h-40 '>
						<CgProfile
							size={22}
							className='flex flex-col justify-center items-center w-full h-full '
						/>
					</div>
					<ProfileField
						className='flex font-bold tracking-widest justify-center'
						value={login}
					/>
					<MyButton
						className={`${
							theme === 'light'
								? 'border-yellow-900 bg-yellow-900'
								: ' border-blue-600 bg-blue-600'
						} hover:bg-red-600 hover:border-red-600 border-[1px] text-white w-full logout`}
						fullWidth
						onClick={() => handleLogout()}
					>
						Выйти
					</MyButton>
				</div>
				{isEditing ? (
					<div className='right'>
						<ProfileForm current={current} setIsEditing={setIsEditing} />
					</div>
				) : (
					<div className='right-sup'>
						<ProfileField label='Имя' value={name} />
						<ProfileField label='Email' value={email} />
						<ProfileField label='Пароль' value={password} type='password' />
						<ProfileField label='Телефон' value={phone} />
						<ProfileField label='ИНН' value={inn} />
						<ProfileField label='Статус' value={status} />
						{status === 'llc' ? (
							<ProfileField label='ОГРН' value={ogrn} />
						) : status === 'individual-entrepreneur' ? (
							<ProfileField label='ОГРНИП' value={ogrnip} />
						) : (
							''
						)}
						{!isEditing && (
							<div className='flex justify-center mt-4'>
								<MyButton
									fullWidth
									className={`${
										theme === 'light'
											? 'border-yellow-900 bg-yellow-900'
											: ' border-blue-600 bg-blue-600'
									} border-[1px] w-full text-white `}
									onClick={handleEditClick}
								>
									Редактировать
								</MyButton>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProfileFunc

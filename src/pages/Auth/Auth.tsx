import React, { useState } from 'react'
import Tabs from '../../components/Tabs/Tabs'
import Login from '../../features/Login'
import Register from '../../features/Register'
import './Tabs.css'

const Auth: React.FC = () => {
	const [selected, setSelected] = useState('login')
	const [visible, setVisible] = useState(false)


	return (
		<div className='flex justify-center h-screen items-center'>
			<div className='flex flex-col justify-center'>
				<div className='h-fit w-[320px] bg-black rounded-lg p-4'>
					<div className='tabs'>
						<div className='tab-list'>
							<Tabs
								id='login'
								title='Вход'
								selected={selected}
								setSelected={setSelected}
							/>
							<Tabs
								id='register'
								title='Регистрация'
								selected={selected}
								setSelected={setSelected}
							/>
						</div>
						<div className='tab-content'>
							{selected === 'login' && <Login setVisible={setVisible} visible={visible} setSelected={setSelected} />}
							{selected === 'register' && (
								<Register setVisible={setVisible} visible={visible} setSelected={setSelected} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth

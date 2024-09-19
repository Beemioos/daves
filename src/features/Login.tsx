import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import MyButton from '../components/MyButton/MyButton'
import MyInput from '../components/MyInput/MyInput'
import { useLazyCurrentQuery,useLoginMutation } from '../app/services/userApi'
import { hasErrorField } from '../utils/hasErrorField'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface Login {
	login: string
	password: string
}

interface Props {
	setSelected: (arg: string) => void
	setVisible: (arg:boolean) => void
	visible: boolean
}

const Login: React.FC<Props> = ({ setSelected, visible, setVisible }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Login>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
		defaultValues: {
			login: '',
			password: '',
		},
	})

	const [login, { isLoading }] = useLoginMutation()
	const [error, setError] = useState('')
	const [triggerCurrentQuery] = useLazyCurrentQuery()
	const navigate = useNavigate()

	const onSubmit = async (data: Login) => {
		try {
			await login(data).unwrap()
			await triggerCurrentQuery().unwrap()
			navigate('/orders')
		} catch (error) {
			console.error(error)

			if (hasErrorField(error)) {
				setError(error.data.error)
			}
		}
	}

	return (
		<form
			className='flex gap-4 items-center flex-col'
			onSubmit={handleSubmit(onSubmit)}
		>
			<MyInput
				control={control}
				name='login'
				fullWidth
				placeholder='Логин'
				required='Обязательное поле'
				type='text'
				error={errors.login?.message}
			/>
			<div className='w-full relative '>
				<MyInput
					control={control}
					name='password'
					fullWidth
					placeholder='Пароль'
					required='Обязательное поле'
					type='password'
					visible={visible}
					error={errors.password?.message}
				/>
				{visible ? (
					<FaRegEye onClick={()=>setVisible(!visible)} className='absolute z-10 top-3 right-4' />
				) : (
					<FaRegEyeSlash onClick={()=>setVisible(!visible)} className=' z-10 absolute top-3 right-4' />
				)}
			</div>
			<p className='text-center text-sm'>
				Нет аккаунта?{' '}
				<a className='text-blue-600 ' onClick={() => setSelected('register')}>
					Зарегистрируйтесь
				</a>
			</p>
			<ErrorMessage error={error} />
			<div className='flex gap-2 w-full justify-end'>
				<MyButton
					isLoading={isLoading}
					fullWidth
					className='border-[1px] text-white border-blue-600 w-full bg-blue-600'
					type='submit'
				>
					Войти
				</MyButton>
			</div>
		</form>
	)
}

export default Login

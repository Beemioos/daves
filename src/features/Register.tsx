import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useRegisterMutation } from '../app/services/userApi'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import MyButton from '../components/MyButton/MyButton'
import MyInput from '../components/MyInput/MyInput'
import MySelect from '../components/MySelect/MySelect'
import { hasErrorField } from '../utils/hasErrorField'

interface RegisterFormValues {
	email: string
	password: string
	name: string
	login: string
	phone: string
	inn: string
	status: 'self-employed' | 'individual-entrepreneur' | 'llc'
	ogrn: string
}

interface Props {
	setSelected: (arg: string) => void
	setVisible: (arg: boolean) => void
	visible: boolean
}

const Register: React.FC<Props> = ({ setSelected, visible, setVisible }) => {
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			password: '',
			login: '',
			inn: '',
			status: 'llc',
			ogrn: '',
		},
	})

	const [register, { isLoading }] = useRegisterMutation()
	const [error, setError] = useState('')
	
	// Watch the status to conditionally validate fields
	const status = watch('status')

	const onSubmit = async (data: RegisterFormValues) => {
		try {
			await register(data).unwrap()
			setSelected('login')
		} catch (error) {
			console.error('Ошибка регистрации:', error)

			if (hasErrorField(error)) {
				setError(error.data.error)
			}
		}
	}

	return (
		<form
			className='flex gap-2 items-center flex-col'
			onSubmit={handleSubmit(onSubmit)}
		>
			<MyInput
				control={control}
				name='name'
				fullWidth
				placeholder='ФИО'
				required='Обязательное поле'
				type='text'
				rules={{
					pattern: {
						value: /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/,
						message: 'Неверный формат ФИО',
					},
				}}
				error={errors.name?.message}
			/>
			<MyInput
				control={control}
				name='email'
				fullWidth
				placeholder='Email'
				required='Обязательное поле'
				type='email'
				rules={{
					pattern: {
						value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
						message: 'Введите корректный адрес электронной почты',
					},
				}}
				error={errors.email?.message}
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
					rules={{
						minLength: {
							value: 6,
							message: 'Пароль должен содержать минимум 6 символов',
						},
					}}
					error={errors.password?.message}
				/>
				{visible ? (
					<FaRegEye
						onClick={() => setVisible(!visible)}
						className='absolute z-10 top-3 right-4'
					/>
				) : (
					<FaRegEyeSlash
						onClick={() => setVisible(!visible)}
						className=' z-10 absolute top-3 right-4'
					/>
				)}
			</div>
			<MyInput
				control={control}
				name='login'
				fullWidth
				placeholder='Логин'
				required='Обязательное поле'
				type='text'
				error={errors.login?.message}
			/>
			<MyInput
				control={control}
				name='phone'
				placeholder='Телефон'
				required='Обязательное поле'
				type='text'
				phoneInput
				rules={{
					pattern: {
						value: /^\+7\d{3}\d{3}\d{2}\d{2}$/,
						message: 'Введите корректный телефон',
					},
				}}
				error={errors.phone?.message}
			/>
			<MyInput
				control={control}
				name='inn'
				fullWidth
				placeholder='ИНН'
				required='Обязательное поле'
				type='text'
				rules={{
					pattern: {
						value: status === 'llc' ? /^\d{10}$/ : /^\d{12}$/,
						message: `ИНН должен содержать ${
							status === 'llc' ? '10' : '12'
						} цифр`,
					},
				}}
				error={errors.inn?.message}
			/>
			<MySelect
				control={control}
				name='status'
				placeholder='Статус'
				fullWidth
				options={[
					{ value: 'self-employed', label: 'Самозанятый' },
					{ value: 'individual-entrepreneur', label: 'ИП' },
					{ value: 'llc', label: 'ООО' },
				]}
				required='Обязательное поле'
				error={errors.status?.message}
			/>
			{status !== 'self-employed' && (
				<MyInput
					control={control}
					name='ogrn'
					fullWidth
					placeholder={status === 'llc' ? 'ОГРН (13 цифр)' : 'ОГРНИП (15 цифр)'}
					required='Обязательное поле'
					type='text'
					rules={{
						pattern: {
							value: status === 'llc' ? /^[15]\d{12}$/ : /^3\d{14}$/,
							message:
								status === 'llc'
									? 'ОГРН должен содержать 13 цифр и начинаться с 1 или 5'
									: 'ОГРНИП должен содержать 15 цифр и начинаться с 3',
						},
					}}
					error={errors.ogrn?.message}
				/>
			)}
			<p className='text-center text-sm'>
				Есть аккаунт?{' '}
				<a
					className='text-blue-600 cursor-pointer'
					onClick={() => setSelected('login')}
				>
					Войдите
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
					Зарегистрироваться
				</MyButton>
			</div>
		</form>
	)
}

export default Register

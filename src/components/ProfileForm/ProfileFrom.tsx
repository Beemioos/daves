import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../../app/services/userApi'
import { selectCurrent } from '../../features/userSlice'
import { IUser } from '../../modals/IUser'
import { ThemeContext } from '../../theme-privider'
import { hasErrorField } from '../../utils/hasErrorField'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import MySelect from '../MySelect/MySelect'

interface Props {
	current: IUser
	setIsEditing: (arg: boolean) => void
}

const ProfileForm: React.FC<Props> = ({ current, setIsEditing }) => {
	const { theme } = useContext(ThemeContext)
	const user = useSelector(selectCurrent)
	const [visible, setVisible] = useState(false)
	const id = user?.id
	const { email, inn, login, name, ogrn, ogrnip, phone, status } = current
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<IUser>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
		defaultValues: {
			name: name,
			email: email,
			phone: phone,
			login: login,
			inn: inn,
			status: status,
			ogrn: ogrn,
			ogrnip: ogrnip,
		},
	})

	const [update, { isLoading }] = useUpdateUserMutation()
	const [error, setError] = useState('')

	const statusQ = watch('status')
	const onSubmit = async (data: IUser) => {
		try {
			await update({ data, id }).unwrap()
			setIsEditing(false)
		} catch (error) {
			console.error('Ошибка регистрации:', error)

			if (hasErrorField(error)) {
				setError(error.data.error)
			}
		}
	}

	return (
		<form
			className='flex gap-2 items-center justify-center flex-col'
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
				fullWidth
				placeholder='Телефон'
				required='Обязательное поле'
				type='text'
				rules={{
					pattern: {
						value: /^\+7\d{3}\d{3}\d{2}\d{2}$/,
						message: 'Введите телефон в формате +7(XXX)-XXX-XX-XX',
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
						value: statusQ === 'llc' ? /^\d{10}$/ : /^\d{12}$/,
						message: `ИНН должен содержать ${
							statusQ === 'llc' ? '10' : '12'
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
			{statusQ !== 'self-employed' && (
				<MyInput
					control={control}
					name={`${
						statusQ === 'individual-entrepreneur'
							? 'ogrn'
							: statusQ === 'llc'
							? 'ogrnip'
							: ''
					}`}
					fullWidth
					placeholder={
						statusQ === 'llc' ? 'ОГРН (13 цифр)' : 'ОГРНИП (15 цифр)'
					}
					required='Обязательное поле'
					type='text'
					rules={{
						pattern: {
							value: statusQ === 'llc' ? /^[15]\d{12}$/ : /^3\d{14}$/,
							message:
								statusQ === 'llc'
									? 'ОГРН должен содержать 13 цифр и начинаться с 1 или 5'
									: 'ОГРНИП должен содержать 15 цифр и начинаться с 3',
						},
					}}
					error={errors.ogrn?.message}
				/>
			)}
			<ErrorMessage error={error} />
			<div className='flex gap-2 w-full justify-end'>
				<MyButton
					isLoading={isLoading}
					fullWidth
					className={`${
						theme === 'light'
							? 'border-yellow-900 bg-yellow-900'
							: ' border-blue-600 bg-blue-600'
					} hover:bg-green-600 hover:border-green-600 border-[1px] text-white w-full`}
					type='submit'
				>
					Сохранить
				</MyButton>
				<MyButton
					fullWidth
					className={`${
						theme === 'light'
							? 'border-yellow-900 bg-yellow-900'
							: ' border-blue-600 bg-blue-600'
					} hover:bg-red-600 hover:border-red-600 border-[1px] text-white w-full`}
					type='button'
					onClick={() => setIsEditing(false)}
				>
					Назад
				</MyButton>
			</div>
		</form>
	)
}

export default ProfileForm

import { useContext } from 'react'
import { ThemeContext } from '../../theme-privider'
interface ProfileFieldProps {
	label?: string
	value: string | undefined 
	className?: string
	type?: string

}

const ProfileField: React.FC<ProfileFieldProps> = ({
	label,
	value,
	className,
	type = 'text',
}) => {
	const { theme } = useContext(ThemeContext)
	return (
		<div className={`flex justify-between ${className}`}>
			<span
				className={`${
					theme === 'light' ? 'text-gray-800' : 'text-white'
				} font-medium text-xl italic font-mono underline font-extralight`}
			>
				{label === 'Email' ? 'Почта' : label}
			</span>
			<span
				className={`flex text-xl items-center gap-2 ${
					theme === 'light' ? 'text-gray-800' : 'text-white'
				}`}
			>
				{type === 'password'
					? '••••••••'
					: value === 'individual-entrepreneur'
					? 'ИП'
					: value === 'llc'
					? 'ООО'
					: value === 'self-employed'
					? 'Самозанятый'
					: value}
			</span>
		</div>
	)
}
export default ProfileField

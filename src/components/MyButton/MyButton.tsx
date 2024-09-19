import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

interface MyButton {
	children: React.ReactNode
	path?: string
	onClick?:()=>void
	fullWidth?: boolean
	isLoading?: boolean
	className?: string
	type?: 'submit' | 'reset' | 'button'
}

const MyButton: React.FC<MyButton> = ({
	fullWidth,
	isLoading,
	type,
	onClick,
	path,
	children,
	className,
}) => {
	return (
		<button
		onClick={onClick}
			type={type || 'submit'}
			className={`py-2 px-4 rounded-xl hover:bg-opacity-80 transition-all duration-300 hover:text-white 
				${className} ${fullWidth ? 'w-[100wv]' : ''}`}
		>
			<Link to={path || ''}>{isLoading? <Loading/> : children}</Link>
		</button>
	)
}

export default MyButton

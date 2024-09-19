import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

interface NavButton {
	children?: React.ReactNode
	className?: string
	onClick?:MouseEventHandler<HTMLButtonElement>
	icon?: JSX.Element
	path: string

}

const NavButton: React.FC<NavButton> = ({
	path,
	onClick,
	className,
	icon,
	children,

}) => {
	return (
		<button className='flex gap-2 items-center' onClick={onClick}>
			{icon}
			<Link className={`${className}`} to={path}>
				{children}
			</Link>
		</button>
	)
}

export default NavButton

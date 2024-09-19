import { format, toZonedTime } from 'date-fns-tz'
import React, { useContext } from 'react'
import { IOrder } from '../../modals/IOrder'
import { ThemeContext } from '../../theme-privider'
import StatusValidator from '../StatusValidator'

interface OrderCardProps {
	order: IOrder
	onClick: () => void 
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
	const imageUrl = `http://localhost:3000${order.image}`
	const { theme } = useContext(ThemeContext)
	const formatDate = (dateString:  Date |string) => {
		const date = new Date(dateString)
		const timeZone = 'Europe/Moscow'
		const zonedDate = toZonedTime(date, timeZone)
		const formattedDate = format(zonedDate, 'dd-MM-yyyy', { timeZone })

		return `${formattedDate}`
	}

	return (
		<div
			className={`${
				theme === 'light' ? 'border-yellow-950 bg-' : 'border-white'
			} p-4 m-2 border-[1px] rounded-xl`}
		>
			<li key={order.id} className='flex gap-2 flex-col items-center'>
				<img
					className='w-40 h-40 object-cover rounded-lg cursor-pointer'
					src={imageUrl}
					alt={order.orderName}
				/>
				<div className='flex w-full flex-col items-center justify-center'>
					<p
						onClick={onClick}
						className='underline text-blue-500 hover:text-blue-400 cursor-pointer'
					>
						{order.id}
					</p>
					<p className='w-36 h-10 flex flex-col items-center justify-center'>
						{order.orderName}
					</p>
					<p className='w-36 h-10 flex flex-col items-center justify-center text-center'>
						{order.createdAt?formatDate(order.createdAt):null}
					</p>
				</div>

				<p>{<StatusValidator status={order.status} />}</p>
				{/* <MyButton fullWidth className=''>
					Подробнее
				</MyButton> */}
			</li>
		</div>
	)
}

export default OrderCard

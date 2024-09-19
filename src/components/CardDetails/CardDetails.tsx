import { format, toZonedTime } from 'date-fns-tz'
import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useUpdateOrderByIdMutation } from '../../app/services/orderApi'
import { selectCurrent } from '../../features/userSlice'
import { IOrder } from '../../modals/IOrder'
import { ThemeContext } from '../../theme-privider'
import MyButton from '../MyButton/MyButton'
import StatusValidator from '../StatusValidator'
import './CardDetails.scss'

interface Props {
	order: IOrder | null
	onUpdate: (updatedOrder: IOrder) => void
}

const CardDetails: React.FC<Props> = ({ order, onUpdate }) => {
	const user = useSelector(selectCurrent)
	const { theme } = useContext(ThemeContext)
	const [updateOrder] = useUpdateOrderByIdMutation()
	const [localOrder, setLocalOrder] = useState(order)
	const [qrVisible, setQrVisible] = useState(false)
	const [qrPath, setQrPath] = useState(order?.qrCodePath || null)

	// Обновляем состояние при изменении ордера
	useEffect(() => {
		if (order) {
			setLocalOrder(order)
			setQrPath(order.qrCodePath)
		}
	}, [order])

	if (!localOrder) {
		return <div>Данные не найдены</div>
	}

	const imageUrl = `http://localhost:3000${localOrder.image || ''}`
	const qrUrl = `http://localhost:3000${qrPath || ''}`

	const timeZone = 'Europe/Moscow'
	const formatDate = (dateString: Date | string) => {
		const date = new Date(dateString)
		const zonedDate = toZonedTime(date, timeZone)
		const formattedDate = format(zonedDate, 'dd-MM-yyyy')

		return `${formattedDate}`
	}

	const handleStatusChange = async (status: string) => {
		const orderId = localOrder.id
		try {
			const updatedOrder = await updateOrder({ id: orderId, status }).unwrap()
			setLocalOrder(updatedOrder)
			setQrPath(updatedOrder.qrCodePath)
			onUpdate(updatedOrder)
		} catch (error) {
			console.error('Ошибка при обновлении статуса:', error)
		}
	}

	return (
		<div className='card-main'>
			<div className='image_block'>
				{qrVisible && qrPath ? (
					 <a href={`/guest/${localOrder.id}`} target='_blank'>
					<img className='image' src={qrUrl} alt='QR Code' />

				 </a>
				) : (
					<img className='image' src={imageUrl} alt={localOrder.orderName} />
				)}

				{localOrder.status !== 'pending' && qrPath && (
					<MyButton
						onClick={() => setQrVisible(!qrVisible)}
						className={`${
							theme === 'light' ? 'bg-yellow-900' : 'bg-blue-600'
						} border-[1px] text-white w-full py-4 border-none mt-8`}
					>
						{qrVisible ? 'Скрыть QR' : 'Посмотреть QR'}
					</MyButton>
				)}

				<p className='cost'>{localOrder.cost} руб.</p>
			</div>
			<div className='right'>
				<div className='seller_block'>
					<div className='login_ct'>
						<Link to='/profile'>{user?.login}</Link>
					</div>
					<IoIosArrowForward size={10} />
				</div>
				<h2 className='text-2xl font-bold my-4'>{localOrder.orderName}</h2>
				<p className='mb-2'>Адрес: {localOrder.address}</p>
				<p className='mb-2'>Клиент: {localOrder.clientName}</p>
				<p className='mb-2'>Паспорт: {localOrder.passport}</p>
				<p className='mb-2'>Телефон: {localOrder.phone}</p>
				<p className='mb-2'>Вес: {localOrder.weight} кг</p>
				<p className='mb-2'>Объем: {localOrder.volume} м³</p>

				<div className='info_block'>
					<p className='mb-4'>
						Дата передачи: {formatDate(localOrder.dateTransfer)}
					</p>
					<p className='mb-4'>
						Дата доставки: {formatDate(localOrder.dateDelivery)}
					</p>
					<p className='mb-4'>
						Дата получения: {formatDate(localOrder.dateReceipt)}
					</p>
					{user?.role === 'admin' && (
						<>
							{localOrder.status === 'pending' && (
								<MyButton
									className={`${
										theme === 'light' ? 'bg-yellow-900' : 'bg-blue-600'
									} border-[1px] text-white py-4 border-none mt-8`}
									onClick={() => handleStatusChange('in-progress')}
								>
									Принять в работу
								</MyButton>
							)}
							{localOrder.status === 'in-progress' && (
								<div>
									<MyButton
										className={`${
											theme === 'light' ? 'bg-yellow-900' : 'bg-blue-600'
										} border-[1px] text-white w-32 py-1 border-none m-1`}
										onClick={() => handleStatusChange('completed')}
									>
										Принять
									</MyButton>
									<MyButton
										className={`${
											theme === 'light' ? 'bg-yellow-900' : 'bg-blue-600'
										} border-[1px] w-32 text-white py-1 border-none`}
										onClick={() => handleStatusChange('rejected')}
									>
										Отклонить
									</MyButton>
								</div>
							)}
							{['completed', 'rejected'].includes(localOrder.status) && (
								<StatusValidator status={localOrder.status} />
							)}
						</>
					)}
					{user?.role !== 'admin' && (
						<>
							<StatusValidator status={localOrder.status} />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default CardDetails

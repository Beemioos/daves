import { format, toZonedTime } from 'date-fns-tz'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { useGetOrderByIDQuery } from '../../app/services/orderApi'
import StatusValidator from '../../components/StatusValidator'

const Guest: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const { data: order, error, isLoading } = useGetOrderByIDQuery(id!)
	const imageUrl = `http://localhost:3000${order?.image || ''}`

	const timeZone = 'Europe/Moscow'

	const formatDate = (dateString: Date | string) => {
		const date = new Date(dateString)
		const zonedDate = toZonedTime(date, timeZone)
		const formattedDate = format(zonedDate, 'dd-MM-yyyy')

		return `${formattedDate}`
	}

	if (isLoading) return <div>Загрузка...</div>
	if (error || !order) return <div>Ошибка при загрузке данных</div>

	return (
		<div className='card-main'>
			<div className='image_block'>
				<img className='image' src={imageUrl} alt={order.orderName} />
				<p className='cost'>{order.cost} руб.</p>
			</div>
			<div className='right'>
				<div className='seller_block'>
					<IoIosArrowForward size={10} />
				</div>
				<h2 className='text-2xl font-bold my-4'>{order.orderName}</h2>
				<p className='mb-2'>Адрес: {order.address}</p>
				<p className='mb-2'>Клиент: {order.clientName}</p>
				<p className='mb-2'>Паспорт: {order.passport}</p>
				<p className='mb-2'>Телефон: {order.phone}</p>
				<p className='mb-2'>Вес: {order.weight} кг</p>
				<p className='mb-2'>Объем: {order.volume} м³</p>

				<div className='info_block'>
					<p className='mb-4'>
						Дата передачи: {formatDate(order.dateTransfer)}
					</p>
					<p className='mb-4'>
						Дата доставки: {formatDate(order.dateDelivery)}
					</p>
					<p className='mb-4'>
						Дата получения: {formatDate(order.dateReceipt)}
					</p>

					<StatusValidator status={order.status} />
				</div>
			</div>
		</div>
	)
}

export default Guest

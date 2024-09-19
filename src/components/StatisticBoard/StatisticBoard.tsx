import { useSelector } from 'react-redux'
import { useGetOrderByUserIdQuery } from '../../app/services/orderApi'
import { selectCurrent } from '../../features/userSlice'
import Loading from '../Loading/Loading'
import './app.scss'

const StaticsticBoard = () => {
	const user = useSelector(selectCurrent)
	const userId = user?.id
	const normalizedUserId = String(userId)
	const { data: orders = [], isLoading } =
		useGetOrderByUserIdQuery(normalizedUserId)

	if (isLoading) return <Loading />

	let totalPrice = 0
	orders.map(order => (totalPrice += order.cost))

	const totalOrders = orders.length
	const completedOrders = orders.filter(
		order => order.status === 'completed'
	).length
	const inProgressOrders = orders.filter(
		order => order.status === 'in-progress'
	).length
	const pendingOrders = orders.filter(
		order => order.status === 'pending'
	).length
	const rejectedOrders = orders.filter(
		order => order.status === 'rejected'
	).length
	const getGradientClass = () => {
		if (rating > 7) return 'animate-gradient-green';
		if (rating >= 4) return 'animate-gradient-yellow';
		return 'animate-gradient-red';
	  };
	const rejectionRate =
		totalOrders > 0 ? (rejectedOrders / totalOrders) * 10 : 0
	const rating = Math.max(0, Math.min(10, 10 - rejectionRate))

	return (
		<div className='main-block'>
			<h2 className='h2'>Статистика</h2>
			<div className='rating-section mb-6'>
				<span className='line'>
					{rating.toFixed(1)} / 10
				</span>
				<div className='rating-bar www'>
					<div
						className={`rating-fill ${getGradientClass()} h-full animate-gradient`}
						style={{ width: `${rating * 100}%` }}
					/>
				</div>
			</div>
			<div className='bloack'>
				<span>Общее количество заказов:</span>
				<span>{totalOrders}</span>
			</div>
			<div className='bloack'>
				<span>В работе:</span>
				<span>{inProgressOrders}</span>
			</div>
			<div className='bloack'>
				<span>Завершенные:</span>
				<span>{completedOrders}</span>
			</div>
			<div className='bloack'>
				<span>На рассмотрении:</span>
				<span>{pendingOrders}</span>
			</div>
			<div className='bloack'>
				<span>Отклоненные:</span>
				<span>{rejectedOrders}</span>
			</div>
			<div className='bloack'>
				<span className='rrr'>Заказов на сумму:</span>
				<span className='rrr'>{totalPrice}</span>
			</div>
		</div>
	)
}

export default StaticsticBoard

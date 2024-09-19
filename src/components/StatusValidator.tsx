interface Props {
	status: string | undefined
}

const StatusValidator: React.FC<Props> = ({ status }) => {
	return (
		<div
			className={`px-2 py-1 rounded-xl text-center ${
				status === 'rejected'
					? 'bg-red-600'
					: status === 'completed'
					? 'bg-black'
					: status === 'in-progress'
					? 'bg-green-500'
					: status === 'pending'
					? 'bg-yellow-500'
					: ''
			}`}
		>
			{status === 'rejected'
				? 'Отклонено'
				: status === 'completed'
				? 'Завершено'
				: status === 'in-progress'
				? 'В работе'
				: status === 'pending'
				? 'На рассмотрении'
				: ''}
		</div>
	)
}

export default StatusValidator

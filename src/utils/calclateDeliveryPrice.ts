interface Props {
	weightValue: number
	volumeValue: number
	setError: (
		field:
			| 'orderName'
			| 'clientName'
			| 'passport'
			| 'phone'
			| 'weight'
			| 'volume'
			| 'address'
			| 'dateDelivery'
			| 'cost'
			| `root.${string}`
			| 'root',
		error: { message: string }
	) => void
	clearErrors: (
		field:
			| `root.${string}`
			| 'orderName'
			| 'clientName'
			| 'passport'
			| 'phone'
			| 'weight'
			| 'volume'
			| 'address'
			| 'dateDelivery'
			| 'cost'
			| 'root'
			| readonly ('orderName' | 'clientName' | 'passport' | 'cost')[]
			| ('orderName' | 'cost')[]
			| undefined
	) => void
	setCost: (cost: number) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValue: (
		field:
			| 'orderName'
			| 'clientName'
			| 'passport'
			| 'phone'
			| 'weight'
			| 'volume'
			| 'address'
			| 'dateDelivery'
			| 'cost',
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value: any
	) => void
}

const calculateDeliveryPrice = ({
	weightValue,
	volumeValue,
	setError,
	clearErrors,
	setCost,
	setValue,
}: Props) => {
	if (weightValue > 100) {
		setError('weight', { message: 'Максимальный вес 100 кг' })
	} else {
		clearErrors('weight')
	}
	if (volumeValue > 10) {
		setError('volume', { message: 'Максимальный объем 10 м³' })
	} else {
		clearErrors('volume')
	}
	let calculatedCost = 1000
	if (weightValue > 20) {
		calculatedCost += Math.ceil((weightValue - 20) / 10) * 500
	}
	if (volumeValue > 2) {
		calculatedCost += (volumeValue - 2) * 300
	}
	setCost(calculatedCost)
	setValue('cost', calculatedCost)
}

export default calculateDeliveryPrice

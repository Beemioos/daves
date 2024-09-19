export interface IOrder {
	id?: string 
	createdAt?: Date
	status?: 'pending' | 'in-progress' | 'completed' | 'rejected'
	orderName: string
	clientName: string
	passport: string
	phone: string
	weight: number
	volume: number
	address: string
	dateReceipt: Date |string
	dateTransfer: Date |string
	dateDelivery: Date |string
	cost: number
	image: File
	qrCodePath: File

}

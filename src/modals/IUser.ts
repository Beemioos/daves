export interface IUser {
	id: string 
	email: string
	password?: string 
	name: string
	login: string
	phone: string
	inn: string
	status: 'self-employed' | 'individual-entrepreneur' | 'llc'
	ogrn?: string 
	ogrnip?: string 
	role?:string
}

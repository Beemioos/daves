const ErrorMessage = ({ error = '' }: { error: string }) => {
	return error && <p className='text-sm text-red-500 mb-5 mt-2'>{error}</p>
}

export default ErrorMessage

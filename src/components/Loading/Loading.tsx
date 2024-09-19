const Loading = () => {
	return (
		<span className='flex justify-center'>
				<svg
					className='animate-spin h-5 w-5 mr-3 text-white'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						className='opacity-25'
						fill='currentColor'
						d='M12 4a8 8 0 100 16 8 8 0 000-16z'
					/>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M12 2v4m0 12v4m8-10h-4m-12 0H2m16.364 6.364l-2.828-2.828m-8.486 0l-2.828 2.828M17.656 6.344L14.828 9.17m-5.656 0L6.344 6.343'
					/>
				</svg>
				
		</span>
	)
}

export default Loading

import { Control, RegisterOptions, useController } from 'react-hook-form'
import { MdImage } from 'react-icons/md'

interface Props {
	preview: string | null
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	name: string
	required?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>
	error?: string
	rules?: RegisterOptions
}

const CooseImage: React.FC<Props> = ({
	name,
	control,
	required,
	rules,
	handleImageChange,
	preview,
}) => {
	const {
		field,
		fieldState: { error: fieldError },
	} = useController({
		name,
		control,
		rules: {
			required: required ? { value: true, message: required } : false,
			...rules,
		},
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleImageChange(e)
		if (e.target.files && e.target.files[0]) {
			field.onChange(e.target.files[0]) 
		}
	}

	return (
		<div className='flex flex-col items-center mb-2'>
			<label htmlFor='image-upload'>
				{preview ? (
					<img
						src={preview}
						className='w-72 h-72 object-cover rounded-lg cursor-pointer hover:opacity-80 transition duration-150 ease-in-out'
					/>
				) : (
					<div className='flex items-center justify-center w-72 h-72 bg-gray-100 rounded-lg cursor-pointer hover:opacity-80 transition duration-150 ease-in-out'>
						<MdImage size={64} className='text-gray-500' />
					</div>
				)}
			</label>
			<input
				id='image-upload'
				type='file'
				accept='image/*'
				name={name}
				onChange={handleChange}
				className='hidden'
			/>
			{fieldError && <span className="text-red-500">{fieldError.message}</span>}
		</div>
	)
}

export default CooseImage

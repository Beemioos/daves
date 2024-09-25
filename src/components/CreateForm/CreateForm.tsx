import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../../app/services/orderApi'
import { selectCurrent } from '../../features/userSlice'
import { IOrder } from '../../modals/IOrder'
import { ThemeContext } from '../../theme-privider'
import calculateDeliveryPrice from '../../utils/calclateDeliveryPrice'
import { hasErrorField } from '../../utils/hasErrorField'
import CooseImage from '../CooseImage/CooseImage'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import MyDatePicker from '../PickDate/PicDate'

interface Order {
  orderName: string
  clientName: string
  passport: string
  phone: string
  weight: number
  volume: number
  address: string
  dateDelivery: Date
  dateTransfer: Date 
  dateReceipt: Date
  cost: number
  image: File
}

const CreateForm = () => {
  const { theme } = useContext(ThemeContext)
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Order>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      orderName: '',
      clientName: '',
      passport: '',
      phone: '',
      address: '',
      dateTransfer: new Date(),
      cost: 1000,
    },
  })

  const weight = watch('weight')
  const volume = watch('volume')
  const dateDelivery = watch('dateDelivery')
  const dateTransfer = watch('dateTransfer')
  const [cost, setCost] = useState<number>(1000)

  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const [createError, setCreateError] = useState('')
  const navigate = useNavigate()
  const [image,setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  // Обновление стоимости доставки
  useEffect(() => {
    const weightValue = Number(weight)
    const volumeValue = Number(volume)
    calculateDeliveryPrice({
      weightValue,
      volumeValue,
      setError,
      clearErrors,
      setCost,
      setValue,
    })
  }, [weight, volume, setError, clearErrors, setValue])
  useEffect(() => {
    if (new Date(dateDelivery) < new Date(dateTransfer)) {
      setError('dateDelivery', {
        type: 'manual',
        message: 'Дата доставки не может быть раньше даты передачи',
      })
    } else {
      clearErrors('dateDelivery')
    }
  }, [dateDelivery, dateTransfer, setError, clearErrors])

  const user = useSelector(selectCurrent)

  if (!user) {
    return null
  }

  const onSubmit = async (data: IOrder) => {
    try {
      console.log(data)
      const formData = new FormData()
      if (image) {
        formData.append('image', image) // Используем состояние image
      }
      formData.append('orderName', data.orderName)
      formData.append('clientName', data.clientName)
      formData.append('address', data.address)
      formData.append('cost', data.cost.toString())
      formData.append('passport', data.passport)
      formData.append('phone', data.phone)
      formData.append('dateDelivery', data.dateDelivery.toString())
      formData.append('dateTransfer', data.dateTransfer.toString())
      formData.append('dateReceipt', data.dateReceipt.toString())
      formData.append('volume', data.volume.toString())
      formData.append('weight', data.weight.toString())
      console.log(formData)
      await createOrder({ formData, userId: user.id }).unwrap()
      navigate('/orders')
    } catch (error) {
      console.error('Ошибка при создании заказа:', error)

      if (hasErrorField(error)) {
        setCreateError(error.data.error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='createForm'
    >
      {' '}
      <div className='createFormSup'>
        <div className='flex flex-col gap-4'>
          <MyInput
            control={control}
            name='orderName'
            placeholder='Название посылки'
            required='Обязательное поле'
            type='text'
            error={errors.orderName?.message}
          />
          <CooseImage
            control={control}
            name='image'
            handleImageChange={handleImageChange}
            preview={preview}
          />
        </div>
        <div className='flex flex-col h-80 mt-1 gap-3'>
          <MyInput
            control={control}
            name='clientName'
            placeholder='ФИО'
            required='Обязательное поле'
            type='text'
            rules={{
              pattern: {
                value: /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/,
                message: 'Неверный формат ФИО',
              },
            }}
            error={errors.clientName?.message}
          />
          <MyInput
            control={control}
            name='address'
            placeholder='Адрес доставки'
            required='Обязательное поле'
            type='text'
            error={errors.address?.message}
          />
          <MyInput
            control={control}
            name='phone'
            placeholder='Телефон'
            required='Обязательное поле'
            type='text'
            phoneInput
            rules={{
              pattern: {
                value: /^\+7\d{3}\d{3}\d{2}\d{2}$/,
                message: 'Введите корректный телефон',
              },
            }}
            error={errors.phone?.message}
          />
          <MyInput
            control={control}
            name='passport'
            placeholder='Серия и номер паспорта'
            rules={{
              pattern: {
                value: /^\d{10}$/,
                message: 'Введите корректные данные',
              },
            }}
            required='Обязательное поле'
            type='text'
            error={errors.passport?.message}
          />
          <MyDatePicker
            className='mb-6'
            control={control}
            maxDate={new Date()}
            name='dateReceipt'
            placeholder='Дата получения'
            required='Обязательное поле'
          />
        </div>
      </div>
      <div className='createFormSup2'>
        <div className='flex flex-col gap-8 w-72'>
          <MyDatePicker
            className=''
            control={control}
            minDate={dateTransfer}
            name='dateDelivery'
            placeholder='Дата доставки'
            required='Обязательное поле'
          />

          <MyDatePicker
            control={control}
			      maxDate={dateDelivery}
            name='dateTransfer'
            placeholder='Дата передачи'
            required='Обязательное поле'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <MyInput
            control={control}
            name='weight'
            placeholder='Вес (кг)'
            required='Обязательное поле'
            type='text'
            rules={{
              pattern: {
                value: /^[0-9]+$/,
                message: 'Введите корректный вес',
              },
            }}
            error={errors.weight?.message}
          />
          <MyInput
            control={control}
            name='volume'
            placeholder='Объем м³'
            required='Обязательное поле'
            type='text'
            rules={{
              pattern: {
                value: /^[0-9]+$/,
                message: 'Введите корректный объем',
              },
            }}
            error={errors.volume?.message}
          />
        </div>
      </div>
      {createError && <p className='text-red-500'>{createError}</p>}

				<div className='my-4 text-lg'>
					<b>Стоимость доставки: {cost} руб.</b>
				</div>
				<MyButton

					className={`${
						theme === 'light' ? 'bg-yellow-900' : 'bg-blue-600'
					} border-[1px] text-white w-96 border-none`}
					type='submit'
					isLoading={isLoading}
				>
					Создать
				</MyButton>

    </form>
  )
}

export default CreateForm

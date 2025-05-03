import Button from './components/atoms/Button'
import './index.css'
import Input from './components/atoms/Input'
import { useForm } from 'react-hook-form'
import { FlightSearch } from './api/types'

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm<FlightSearch>()
  const CURRENCY_OPTIONS = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'MXN', label: 'MXN' },
  ]

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <h1 className='text-2xl font-bold text-red-500'>Flight search</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit((data) => console.log(data))}>
          <Input label="Departure airport" id="from" type="text" placeholder="LAX" {...register('originLocationCode', { required: true })} />
          {errors.originLocationCode && <p className="text-red-500">This field is required</p>}
          <Input label="Arrival airport" id="to" type="text" placeholder="MAD" {...register('destinationLocationCode', { required: true })} />
          {errors.destinationLocationCode && <p className="text-red-500">This field is required</p>}
          <Input label="Departure date" id="date" type="date" {...register('departureDate', { required: true })} />
          {errors.departureDate && <p className="text-red-500">This field is required</p>}
          <Input label="Return date" id="returnDate" type="date" {...register('returnDate')} />
          <Input label="Passengers" id="passengers" type="number" placeholder="Number of passengers" {...register('adults', { required: true })} />
          {errors.adults && <p className="text-red-500">This field is required</p>}
          <Input label="Currency" id="currency" type="select" placeholder="Select a currency" options={CURRENCY_OPTIONS} {...register('currencyCode', { required: true })} />
          {errors.currencyCode && <p className="text-red-500">This field is required</p>}
          <Input label="Non stop" id="nonStop" type="checkbox" {...register('nonStop')} />

          <Button type="submit" variant="primary">Search</Button>
        </form>
      </div>
    </>
  )
}

export default App

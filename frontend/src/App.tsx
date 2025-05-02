import Button from './components/atoms/Button'
import './index.css'
import Input from './components/atoms/Input'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <h1 className='text-2xl font-bold text-red-500'>Flight search</h1>
        <form className="flex flex-col gap-5">
          <Input label="Departure airport" id="from" type="text" placeholder="LAX" />
          <Input label="Arrival airport" id="to" type="text" placeholder="MAD" />
          <Input label="Departure date" id="date" type="date" />
          <Input label="Return date" id="returnDate" type="date" />
          <Input label="Passengers" id="passengers" type="number" placeholder="Number of passengers" />
          <Input label="Currency" id="currency" type="text" placeholder="USD" />

          <Button type="submit" variant="primary">Search</Button>
        </form>
      </div>
    </>
  )
}

export default App

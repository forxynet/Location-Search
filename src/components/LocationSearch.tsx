import type { Place } from '../api/Place';
import { useState, Fragment } from 'react';
import { search } from '../api/Search';

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const results = await search(term);
    setPlaces(results);
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <label className='fond-bold' htmlFor='term'>
        Search
      </label>
      <div className="grid grid-cols-4 gap-4">
      <div className='col-span-3'>
        <input
          className='border boder-gray-300 rounded-md shadow-sm px-4 py-2 w-full'
          id='term'
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </div>
      <div className='border boder-gray-300 rounded-md shadow-sm py-2 text-center '>
        <button className=''>
          Search
        </button>
      </div>
      </div>
    </form>

    <h1 className='font-bold mt-6'>Found Locations</h1>
    <div className='grid grid-cols-[1fr_40px] gap-2 mt-2 items-center'>
      {
        places.map(place => {
          return <Fragment key={place.id}>
            <p className='text-sm'>{place.name}</p>
            <button className='bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded'
              onClick={() => onPlaceClick(place)}>
              Go
            </button>
            <div className='border-b w-full col-span-2' />
          </Fragment>
        })
      }
    </div>

  </div>
}

import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const onFilterChange = (event) => {
    dispatch(changeFilter(event.target.value))
  }

  return ( 
    <div>
      filter <input onChange={onFilterChange}/>
    </div>
  )
}

export default Filter
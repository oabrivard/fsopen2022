import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) =>
  <div>
    filter <input onChange={e => props.changeFilter(e.target.value)} />
  </div>

const mapDispatchToProps = {
  changeFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
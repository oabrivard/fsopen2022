import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    color: notification ? notification.color : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  }

  return (!notification ? <></> : <div style={style}>{notification.message}</div>)
}

export default Notification
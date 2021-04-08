import React from 'react'

const Notification = ({notification}) => {
  return (
    <div className={notification.status}>{notification.message}
    </div>
  )
}

export default Notification

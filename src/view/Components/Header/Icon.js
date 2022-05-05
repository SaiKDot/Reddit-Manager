import React from 'react'
import Add from '../../Images/plus_math.svg'
import Resume from '../../Images/resume.svg'
import Resume_D from '../../Images/resume_disabled.svg'
import Stop from '../../Images/stop.svg'
import Stop_D from '../../Images/stop_disabled.svg'
import Cancel from '../../Images/cancel.svg'
import Cancel_D from '../../Images/cancel_disabled.svg'
import Delete from '../../Images/delete.svg'
import Delete_D from '../../Images/delete_disabled.svg'
import DeleteAll from '../../Images/delete_all.svg'
import DeleteAll_D from '../../Images/delete_all_disabled.svg'

export default class Icon extends React.Component {
  render() {
    const { type } = this.props

    let button = null
    switch (type) {
      case 'Add':
        button = Add
        break
      case 'Resume':
        button = Resume
        break
      case 'Resume_D':
        button = Resume_D
        break
      case 'Stop':
        button = Stop
        break
      case 'Stop_D':
        button = Stop_D
        break
      case 'Cancel':
        button = Cancel
        break
      case 'Cancel_D':
        button = Cancel_D
        break
      case 'Delete':
        button = Delete
        break
      case 'Delete_D':
        button = Delete_D
        break
      case 'DeleteAll':
        button = DeleteAll
        break
      case 'DeleteAll_D':
        button = DeleteAll_D
        break
      default:
        button = Add
        break
    }

    return React.createElement(button)
  }
}
import '../assets/css/ActionDropdown.css';
import { RightArrowIcon } from './icons';
import { LeftArrowIcon } from './icons';
import { EditIcon } from './icons';
import { TrashIcon } from './icons';

function ActionDropdown() {
  return (
    <div className='action-dropdown'>
      <ul>
        <li>
          <RightArrowIcon />
          Move Right
        </li>
        <li>
          <LeftArrowIcon />
          Move Left
        </li>
        <li>
          <EditIcon />
          Edit
        </li>
        <li className='action-delete'>
          <TrashIcon />
          Delete
        </li>
      </ul>
    </div>
  )
}

export default ActionDropdown
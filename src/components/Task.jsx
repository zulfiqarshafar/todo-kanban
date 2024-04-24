import { useEffect, useRef, useState } from 'react'
import ActionDropdown from './ActionDropdown';
import moreIcon from '../assets/images/more-horizontal.svg'
import checkIcon from '../assets/images/checklist.svg'
import '../assets/css/Task.css'

function Task({ task }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)

  function handleCloseDropdown(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseDropdown);
    return () => {
      document.removeEventListener('mousedown', handleCloseDropdown);
    };
  }, []);

  return (
    <>
      <section className='task'>
        <div className="task-name">{ task.name }</div>
        <div className="line-divider"></div>
        <section className='task-description'>
          <div className='progress'>
            <div className="progress-bar">
              <span className={`progress-bar-fill ${ task.progress == 100 && 'progress-bar-full'}`} style={{ width: `${task.progress}%`}} ></span>
            </div>
            <div className='progress-value'>
              {
                task.progress < 100 ? `${ task.progress } %` : (<img src={checkIcon} alt="Check icon" />)
              }
            </div>
          </div>
          <div className='action-btn' onClick={() => setIsDropdownOpen(true)}>
            <img src={moreIcon} alt="More icon" />
          </div>
        </section>
      {
        isDropdownOpen && <ActionDropdown selectedTask={ task } setIsDropdownOpen={setIsDropdownOpen} ref={ dropdownRef } />
      }
      </section>

    </>
  )
}

export default Task
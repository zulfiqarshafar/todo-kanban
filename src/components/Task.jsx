import { useEffect, useState } from 'react'
import ActionDropdown from './ActionDropdown';
import moreIcon from '../assets/images/more-horizontal.svg'
import checkIcon from '../assets/images/checklist.svg'
import '../assets/css/Task.css'

function Task({ name, progress }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleCloseDropdown() {
    setIsDropdownOpen(false);
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
        <div className="task-name">{ name }</div>
        <div className="line-divider"></div>
        <section className='task-description'>
          <div className='progress'>
            <div className="progress-bar">
              <span className={`progress-bar-fill ${ progress == 100 && 'progress-bar-full'}`} style={{ width: `${progress}%`}} ></span>
            </div>
            <div className='progress-value'>
              {
                progress < 100 ? `${progress} %` : (<img src={checkIcon} alt="Check icon" />)
              }
            </div>
          </div>
          <div className='action-btn' onClick={() => setIsDropdownOpen(true)}>
            <img src={moreIcon} alt="More icon" />
          </div>
        </section>
      {
        isDropdownOpen && <ActionDropdown />
      }
      </section>

    </>
  )
}

export default Task
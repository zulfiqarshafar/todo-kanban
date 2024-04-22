import React from 'react'
import moreIcon from '../assets/images/more-horizontal.svg'
import checkIcon from '../assets/images/checklist.svg'
import '../assets/css/Task.css'

function Task({ title, progress }) {
  return (
    <section className='task'>
      <div className="task-title">{ title }</div>
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
        <div className='action-btn'>
          <img src={moreIcon} alt="More icon" />
        </div>
      </section>
    </section>

  )

}

export default Task
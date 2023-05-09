import React from 'react'
import {Link} from 'react-router-dom'
// import { FaTimes } from 'react-icons/fa'
import {links } from './sidebardata'

const Sidebar = () => {
  return <aside className={'sidebar show-sidebar'}>
    <div className='sidebar-header'>
      <h3>Dashboard</h3>
    </div>
    <ul className='links'>
      {links.map((link)=>{
        const {id, url, text, icon} = link;
        return (
          <li key={id}>
            <Link to={url}>
              {icon}
              {text}
            </Link>
          </li>
        )
      })}
    </ul>
  </aside>
}

export default Sidebar

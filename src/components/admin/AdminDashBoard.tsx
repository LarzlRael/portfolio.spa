import { useState, useEffect, useContext } from 'react'
import './AdminDashBoard.scss'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { ListProyects } from './pages/ListProyects'
import { Project } from './pages/Project'
import { useWindowSize } from '../../hooks/useWindowsSize'
import { AuthContext } from '../../context/AuthContext'
import { EditProject } from './pages/EditProyect'
import { AddProject } from './pages/AddProyect'
export const AdminDashBoard = () => {
  const { logout } = useContext(AuthContext)
  const [active, setActive] = useState(true)
  const dashboardItems = [
    {
      title: 'Inicio',
      icon: 'fas fa-home',
      link: '/dashboard',
      component: ListProyects,
    },
    {
      title: 'Proyectos',
      icon: 'fas fa-search',
      link: '/dashboard/list_proyects',
      component: Project,
    },
    {
      title: 'Agregar proyecto',
      icon: 'fas fa-plus',
      link: '/dashboard/add_proyect',
      component: Project,
    },
  ]
  const handleSidebar = () => {
    setActive(!active)
  }
  const { windowSize } = useWindowSize()
  useEffect(() => {
    setActive(windowSize.width > 768)
  }, [windowSize])

  return (
    <div className="AdminDashBoard">
      <div className={'sidebar ' + (active ? 'active' : '')}>
        <div className="logo_content pointer" onClick={() => handleSidebar()}>
          <div className="logo">
            <div className="logo_name">Logo :D</div>
          </div>
          <i className="fas fa-bars" id="btn" />
        </div>
        <ul className="nav_list">
          <li>
            <i className="fas fa-search bx-search"></i>
            <input placeholder="search..." type="text" />
          </li>
          {dashboardItems.map((item, index) => (
            <li key={item.title}>
              <NavLink
                to={item.link}
                /* className={({ isActive, isPending }) =>
                  isActive ? 'activeItem' : ''
                } */
              >
                <i className={item.icon}></i>
                <span className="links_name">{item.title}</span>
                <span className="tooltip">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              {/* <img src="" alt="" /> */}
              <div className="name_job">
                <div className="name">Reynaldo</div>
                <div className="job">Web Designer</div>
              </div>
            </div>
            <div className="pointer" onClick={() => logout()}>
              <i id="log_out" className="fas fa-sign-out-alt" />
            </div>
          </div>
        </div>
      </div>
      <div className="home_content">
        <Routes>
          <Route path="/" element={<ListProyects />} />
          <Route path="/list_proyects" element={<ListProyects />} />
          <Route path="/add_proyect" element={<AddProject />} />
          <Route path="/edit_proyect/:id" element={<EditProject />} />
        </Routes>
      </div>
    </div>
  )
}

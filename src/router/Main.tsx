import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { LoginPage } from '../pages/login/LoginPage'
import { Home } from '../pages/home/Home'
import { ProtectedRoutes } from './ProtectedRoute'
import { AdminDashBoard } from '../components/admin/AdminDashBoard'
import { ToastContainer } from 'react-toastify'
/* import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' */
/* import { ProtectedRoutes } from './ProtectedRoutes'
import Page404 from '../components/notFound/Page404'
import { PublicRoute } from './PublicRoute' */

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes>
              <AdminDashBoard />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Home />} />
      </Routes>
      {/* <ToastContainer /> */}
    </Router>
  )
}

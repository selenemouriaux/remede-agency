import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import {
  setIsLoggedIn,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
} from "../userSlice"

const Header = () => {
  const { firstName } = useSelector((state) => {
    return state.userInfo
  })
  const isLoggedIn = useSelector((state) => {
    return state.isLoggedIn
  })
  const remember_me = useSelector((state) => {
    return state.remember_me
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(setIsLoggedIn(false))
    sessionStorage.removeItem("token")
    localStorage.removeItem("token")
    dispatch(setUserFirstName(null))
    dispatch(setUserLastName(null))
    if (!remember_me) {
      dispatch(setUserEmail(""))
    }
    navigate("/")
  }

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="/src/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!isLoggedIn ? (
          <NavLink to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {` Sign In`}
          </NavLink>
        ) : (
          <>
            <NavLink className="main-nav-item" to="/my-account">
              <i className="fa fa-user-circle"></i>
              {firstName ? ` ${firstName}` : " Mon compte"}
            </NavLink>
            <span onClick={logout} className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              {` Sign Out`}
            </span>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header

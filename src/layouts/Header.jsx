import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="/src/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
        {/* {JSON.stringify(store.getState())} */}
      </NavLink>
      <div>
        <NavLink to="/sign-in" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
        <NavLink className="main-nav-item" to="/user">
          <i className="fa fa-user-circle"></i>
          Tony
        </NavLink>
        <NavLink className="main-nav-item" tp="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    </nav>
  )
}

export default Header

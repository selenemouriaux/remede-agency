import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { useSelector } from "react-redux"

const NavLayout = () => {
  //TODO : if token && matches id, set isloggedin to true
  const isLoggedIn = useSelector((state) => {
    return state.isLoggedIn
  })
  const token = sessionStorage.getItem("token") || localStorage.getItem("token")
  return (
    <>
      <Header />
      <Outlet context={{ isLoggedIn, token }} />
      <Footer />
    </>
  )
}

export default NavLayout

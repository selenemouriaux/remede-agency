import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  setRememberMe,
  setIsLoggedIn,
  setUserPassword,
  setUserEmail,
} from "../userSlice"
import { login } from "../services/authentication"
import { useState } from "react"

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = useSelector((state) => {
    return state.userInfo
  })
  const remember_me = useSelector((state) => {
    return state.remember_me
  })

  async function onSubmit(data) {
    dispatch(setRememberMe(data.remember_me))
    const response = await login(data.email, data.password).catch((error) => {
      alert(error.response.data.message)
      dispatch(setUserPassword(data.password))
    })
    if (data.remember_me) {
      localStorage.setItem("token", response.body.token)
      dispatch(setUserEmail(data.email))
    } else {
      sessionStorage.setItem("token", response.body.token)
    }
    dispatch(setIsLoggedIn(true))
    dispatch(setUserPassword(null))
    navigate("/my-account")
  }

  const { register, handleSubmit } = useForm({
    defaultValues: { remember_me: remember_me },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true)
  }

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label htmlFor="email">User email</label>
            <input
              type="email"
              id="email"
              defaultValue={remember_me ? email : "type in your email"}
              {...register("email")}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-wrapper-icon">
              <label htmlFor="password">Password</label>
              <span onClick={togglePasswordVisibility}>
                <i className="fas fa-eye"></i>{" "}
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              defaultValue={password}
              {...register("password")}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember_me"
              {...register("remember_me")}
            />
            <label htmlFor="remember_me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </div>
  )
}

export default SignIn

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { signup } from "../services/authentication"
import { useState } from "react"
import { setRememberMe, setUserEmail, setUserPassword } from "../userSlice"
import { useDispatch } from "react-redux"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(data) {
    await signup(
      data.email,
      data.password,
      data.firstName,
      data.lastName
    ).catch((error) => {
      alert(error.response.data.message)
    })
    dispatch(setUserEmail(data.email))
    dispatch(setUserPassword(data.password))
    dispatch(setRememberMe(true))
    navigate("/sign-in")
  }

  const { register, handleSubmit } = useForm({})

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true)
  }

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign Up - New User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label htmlFor="email">User email</label>
            <input type="email" id="email" {...register("email")} />
          </div>
          <div className="input-wrapper">
            <div className="input-wrapper-icon">
              <label htmlFor="password">Password</label>
              <span onClick={togglePasswordVisibility}>
                <i class="fas fa-eye"></i>{" "}
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" {...register("firstName")} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" {...register("lastName")} />
          </div>
          <button type="submit" className="sign-in-button">
            Create a new account
          </button>
        </form>
      </section>
    </div>
  )
}

export default SignUp

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setPassword, setRememberMe, setUsername } from "../signInSlice"
// import { store } from "../store"

const SignIn = () => {
  // const state = store.getState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state) => {
    return state.username
  })
  const password = useSelector((state) => {
    return state.password
  })
  const remember_me = useSelector((state) => {
    return state.remember_me
  })

  const { register, handleSubmit } = useForm({
    defaultValues: { username, password, remember_me },
  })
  console.log(username, password, remember_me)
  function onSubmit(data) {
    dispatch(setUsername(data.username))
    dispatch(setPassword(data.password))
    dispatch(setRememberMe(data.remember_me))
    navigate(`/user/${data.username}`)
  }

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {username}
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              defaultValue={username}
              {...register("username")}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember_me"
              {...register("remember_me")}
            />
            <label htmlFor="remember_me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </div>
  )
}

export default SignIn

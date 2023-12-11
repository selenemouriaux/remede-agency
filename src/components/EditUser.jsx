import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { setUserFirstName, setUserLastName } from "../userSlice"
import { baseApi } from "../services/baseApi"

const EditUser = ({ token, close }) => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { firstName, lastName } = useSelector((state) => {
    return state.userInfo
  })

  const cleanedForm = (data) => {
    let cleanedFirstName = data.firstName
    let cleanedLastName = data.lastName
    if (cleanedFirstName === "") {
      cleanedFirstName = firstName
    }
    if (cleanedLastName === "") {
      cleanedLastName = lastName
    }
    return {
      cleanedFirstName,
      cleanedLastName,
    }
  }

  async function onSubmit(data) {
    const { cleanedFirstName, cleanedLastName } = cleanedForm(data)
    baseApi
      .put(
        "/user/profile",
        {
          firstName: cleanedFirstName,
          lastName: cleanedLastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          close()
          return res.data
        } else {
          ;<NotFound message="Authentication failed" />
        }
      })
      .then((data) => {
        dispatch(setUserFirstName(data.body.firstName))
        dispatch(setUserLastName(data.body.lastName))
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-inputs-block">
          <div className="edit-inputs">
            <input
              type="text"
              id="firstName"
              placeholder={firstName}
              {...register("firstName")}
            />
          </div>
          <div className="edit-inputs">
            <input
              type="text"
              id="lastName"
              placeholder={lastName}
              {...register("lastName")}
            />
          </div>
        </div>
        <div className="edit-inputs-block">
          <button type="submit" className="edit-inputs-btns">
            Save
          </button>
          <button onClick={close} type="button" className="edit-inputs-btns">
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default EditUser

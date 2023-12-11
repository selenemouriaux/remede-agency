import { useEffect, useState } from "react"
import EditUser from "../components/EditUser"
import { useDispatch, useSelector } from "react-redux"
import { useOutletContext } from "react-router-dom"
import { baseApi } from "../services/baseApi"
import { setUserEmail, setUserFirstName, setUserLastName } from "../userSlice"
import { NotFound } from "../components/NotFound"

const User = () => {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const { firstName, lastName, email, password } = useSelector((state) => {
    return state.userInfo
  })
  const { isLoggedIn, token } = useOutletContext()

  const getProfile = (token) => {
    baseApi
      .post(
        "/user/profile",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return res.data
        } else {
          ;<NotFound message="Authentication failed" />
        }
      })
      .then((data) => {
        dispatch(setUserFirstName(data.body.firstName))
        dispatch(setUserLastName(data.body.lastName))
        dispatch(setUserEmail(data.body.email))
      })
  }

  useEffect(() => {
    if (!token || !isLoggedIn) {
      ;<NotFound message="authentication impossible, redirecting..." />
    }
    getProfile(token)
  }, [])

  return (
    <>
      {!isLoggedIn ? (
        <NotFound message="Problème d'identification" />
      ) : (
        <div className="main bg-dark">
          <div className="header">
            <br />
            <h1>
              Welcome back
              <br />
              {`${firstName} ${lastName} !`}
            </h1>
            {!isEditing ? (
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Name
              </button>
            ) : (
              <EditUser token={token} close={() => setIsEditing(false)} />
            )}
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default User

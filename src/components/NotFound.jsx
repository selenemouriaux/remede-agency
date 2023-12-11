import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function NotFound({ message = "NOT FOUND" }) {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/")
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])
  return <h1>{message}</h1>
}

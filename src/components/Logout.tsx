import React from "react"
import { Button } from "@chakra-ui/react"
import { useUserContext } from "../context/UserContext"
import { useMagicContext } from "../context/MagicContext"
import { useNavigate } from "react-router-dom"

const Logout: React.FC = () => {
  const { setUser } = useUserContext()
  const { magic } = useMagicContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await magic?.user.logout()
      setUser(null)
      navigate("/")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return <Button onClick={handleLogout}>Logout</Button>
}

export default Logout

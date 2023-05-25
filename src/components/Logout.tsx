import { Button } from "@chakra-ui/react"
import { useUserContext } from "../context/UserContext"
import { useNetworkContext } from "../context/NetworkContext"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const { setUser } = useUserContext()
  const { network } = useNetworkContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await network?.logout()
      setUser(null)
      navigate("/")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return <Button onClick={handleLogout}>Logout</Button>
}

export default Logout

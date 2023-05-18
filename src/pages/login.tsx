import { useEffect } from "react"
import { VStack } from "@chakra-ui/react"
import EmailForm from "../components/EmailForm"
import { useUserContext } from "../context/UserContext"
import SocialLogins from "../components/SocialLogins"
import NetworkSelect from "../components/NetworkSelect"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user])

  return (
    <VStack justifyContent="center" alignItems="center" minH="100vh">
      <NetworkSelect />
      <EmailForm />
      <SocialLogins />
    </VStack>
  )
}

export default Login

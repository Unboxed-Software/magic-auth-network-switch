import { useState } from "react"
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Center,
  VStack,
} from "@chakra-ui/react"
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { useUserContext } from "../context/UserContext"
import { useNetworkContext } from "../context/NetworkContext"
import { useNavigate } from "react-router-dom"

const EmailForm = () => {
  const [email, setEmail] = useState("")

  const { fetchUserInfo } = useUserContext()
  const { network } = useNetworkContext()
  const navigate = useNavigate()

  const handleLoginWithEmail = async () => {
    if (!email) {
      return
    }

    try {
      await network?.magic?.auth.loginWithEmailOTP({ email })
      await fetchUserInfo()
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      setEmail("")
    }
  }

  return (
    <VStack>
      <Center color="gray.500">Login</Center>
      <InputGroup size="md" mb={3} mx="auto" w="80%">
        <InputLeftElement>
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <Button leftIcon={<ArrowForwardIcon />} onClick={handleLoginWithEmail}>
        Send Network Link
      </Button>
    </VStack>
  )
}

export default EmailForm

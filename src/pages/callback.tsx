import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { Spinner, Flex } from "@chakra-ui/react"
import { useNetworkContext } from "../context/NetworkContext"

const Callback = () => {
  const { network } = useNetworkContext()
  const { setUser } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    const finishSocialLogin = async () => {
      if (!network) return

      try {
        const result = await network?.getRedirectResult()
        const isLoggedIn = await network?.isLoggedIn()

        if (isLoggedIn && result?.magic.userMetadata) {
          setUser(result.magic.userMetadata)
          navigate("/dashboard")
        }
      } catch (err) {
        console.error("Failed to finish social login", err)
        navigate("/login")
      }
    }

    finishSocialLogin()
  }, [network])

  return (
    <Flex justifyContent="center">
      <Spinner size="xl" color="blue.500" />
    </Flex>
  )
}

export default Callback

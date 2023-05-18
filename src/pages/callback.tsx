import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { Spinner, Flex } from "@chakra-ui/react"
import { useMagicContext } from "../context/MagicContext"

const Callback = () => {
  const { magic } = useMagicContext()
  const { setUser } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    const finishSocialLogin = async () => {
      if (!magic) return

      try {
        const result = await magic.oauth.getRedirectResult()
        const isLoggedIn = await magic.user.isLoggedIn()

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
  }, [magic])

  return (
    <Flex justifyContent="center">
      <Spinner size="xl" color="blue.500" />
    </Flex>
  )
}

export default Callback

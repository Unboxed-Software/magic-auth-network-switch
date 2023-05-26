import { useState } from "react"
import { Button, Center, VStack } from "@chakra-ui/react"
import { useNetworkContext } from "../context/NetworkContext"
import { OAuthProvider } from "@magic-ext/oauth"

const SocialLogins = () => {
  const { network } = useNetworkContext()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const providers = ["google", "github"] as OAuthProvider[]

  async function handleLoginWithSocial(provider: OAuthProvider) {
    setIsRedirecting(true)
    try {
      await network?.loginWithSocial(
        provider,
        new URL("/callback", window.location.origin).href
      )
    } catch (error) {
      console.log("handleLoginWithSocial", error)
      setIsRedirecting(false)
    }
  }

  return (
    <VStack>
      <Center color="gray.500">Or login with</Center>
      {providers.map((provider) => (
        <Button
          key={provider}
          my={1}
          onClick={() => handleLoginWithSocial(provider)}
        >
          {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </Button>
      ))}
      {isRedirecting && <Center color="gray.500">Redirecting...</Center>}
    </VStack>
  )
}

export default SocialLogins

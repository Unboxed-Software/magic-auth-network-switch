import React, { useEffect } from "react"
import { VStack } from "@chakra-ui/react"
import EmailForm from "../components/EmailForm"
import { useUserContext } from "../context/UserContext"
import { useMagicContext } from "../context/MagicContext"
import { OAuthProvider } from "@magic-ext/oauth"
import SocialLogins from "../components/SocialLogins"
import NetworkSelect from "../components/NetworkSelect"
import { useNavigate } from "react-router-dom"

const Login = () => {
  return (
    <VStack>
      <EmailForm />
      <SocialLogins />
      <NetworkSelect />
    </VStack>
  )
}

export default Login

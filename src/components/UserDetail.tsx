import { useCallback, useEffect } from "react"
import { Box, Text } from "@chakra-ui/react"
import { useUserContext } from "../context/UserContext"
import { useNetworkContext } from "../context/NetworkContext"

const UserDetails = () => {
  const { user, setUser } = useUserContext()
  const { network } = useNetworkContext()

  const fetchBalance = useCallback(async () => {
    if (!user) return

    let newUser
    try {
      if (network) {
        const balance = await network?.fetchBalance(user.publicAddress!)
        newUser = { ...user, balance }
      }

      if (JSON.stringify(user) !== JSON.stringify(newUser)) {
        setUser(newUser)
      }
    } catch (error) {
      console.error("Error fetching balance: ", error)
    }
  }, [setUser, network, user])

  useEffect(() => {
    console.log("fetching balance")
    fetchBalance()
  }, [user, fetchBalance])

  return (
    <Box padding="5" boxShadow="lg" bg="white">
      <Text fontWeight="bold" fontSize="xl">
        User Details
      </Text>
      {user ? (
        <Box>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </Box>
      ) : (
        <Text>No user data available.</Text>
      )}
    </Box>
  )
}

export default UserDetails

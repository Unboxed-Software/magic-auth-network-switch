import { useEffect } from "react"
import { Box, Text } from "@chakra-ui/react"
import { useUserContext } from "../context/UserContext"
import { useWeb3Context } from "../context/Web3Context"
import { useMagicContext } from "../context/MagicContext"
import { Networks } from "../utils/networks"
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
/// @ts-ignore
import * as fcl from "@onflow/fcl"

const UserDetails = () => {
  const { user, setUser } = useUserContext()
  const { web3 } = useWeb3Context()
  const { selectedNetwork } = useMagicContext()

  useEffect(() => {
    if (!user) return
    const fetchBalance = async () => {
      let newUser = null
      if (selectedNetwork === Networks.Solana) {
        const connection = new Connection(
          "https://api.devnet.solana.com",
          "confirmed"
        )
        const balance = await connection.getBalance(
          new PublicKey(user.publicAddress)
        )
        newUser = { ...user, balance: balance / LAMPORTS_PER_SOL }
        console.log("BALANCE: ", balance)
      } else if (selectedNetwork === Networks.Flow) {
        // TODO: Implement Flow balance fetch
        fcl.config({
          "accessNode.api": "https://rest-testnet.onflow.org",
        })
        const account = await fcl.account(user.publicAddress!)
        console.log("FLOW ACCOUNT: ", JSON.stringify(account, null, 2))
        const balance = account.balance
        console.log("Balance: ", balance)
        newUser = { ...user, balance: balance }
      } else {
        const balance = await web3?.eth.getBalance(user.publicAddress!)
        const balanceInEth = web3?.utils.fromWei(balance!).substring(0, 7)
        const chainId = await web3?.eth.net.getId()
        newUser = { ...user, balance: balanceInEth, chainId: chainId }
        console.log("BALANCE: ", balanceInEth)
        console.log("CHAIN ID: ", chainId)
      }

      // Only update the user state if the new user data is different
      if (JSON.stringify(user) !== JSON.stringify(newUser)) {
        setUser(newUser)
      }
    }
    fetchBalance()
  }, [user])

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

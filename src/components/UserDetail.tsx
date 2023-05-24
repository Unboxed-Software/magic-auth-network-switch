import { useEffect } from "react"
import { Box, Text } from "@chakra-ui/react"
import { useUserContext } from "../context/UserContext"
import { useWeb3Context } from "../context/Web3Context"
import { useMagicContext } from "../context/MagicContext"
import { Networks } from "../utils/networks"
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
///@ts-ignore
import * as fcl from "@onflow/fcl-1.3.2"

const UserDetails = () => {
  const { user, setUser } = useUserContext()
  const { web3 } = useWeb3Context()
  const { selectedNetwork } = useMagicContext()

  const getSolanaBalance = async () => {
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    )
    const balance = await connection.getBalance(
      new PublicKey(user.publicAddress)
    )
    return { ...user, balance: balance / LAMPORTS_PER_SOL }
  }

  const getFlowBalance = async () => {
    fcl.config({
      "accessNode.api": "https://rest-testnet.onflow.org",
    })
    const account = await fcl.account(user.publicAddress!)
    return { ...user, balance: account.balance }
  }

  const getEVMBalance = async () => {
    const balance = await web3?.eth.getBalance(user.publicAddress!)
    const balanceInEth = web3?.utils.fromWei(balance!).substring(0, 7)
    const chainId = await web3?.eth.net.getId()
    return { ...user, balance: balanceInEth, chainId: chainId }
  }

  const fetchBalance = async () => {
    if (!user) return

    let userData
    try {
      switch (selectedNetwork) {
        case Networks.Solana:
          userData = await getSolanaBalance()
          break
        case Networks.Flow:
          userData = await getFlowBalance()
          break
        default:
          userData = await getEVMBalance()
      }

      if (JSON.stringify(user) !== JSON.stringify(userData)) {
        setUser(userData)
      }
    } catch (error) {
      console.error("Error fetching balance: ", error)
    }
  }

  useEffect(() => {
    console.log("fetching balance")
    fetchBalance()
  }, [user, selectedNetwork])

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

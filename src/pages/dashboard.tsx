import NetworkSelect from "../components/NetworkSelect"
import UserDetails from "../components/UserDetail"
import Logout from "../components/Logout"
import { VStack } from "@chakra-ui/react"

const Dashboard = () => {
  return (
    <VStack>
      <UserDetails />
      <NetworkSelect />
      <Logout />
    </VStack>
  )
}

export default Dashboard

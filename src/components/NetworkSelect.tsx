import { Network } from "../network.ts/supported-networks"
import { useNetworkContext } from "../context/NetworkContext"
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react"
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons"

const NetworkSelect = () => {
  const networkOptions = Object.values(Network)
  const { selectedNetwork, updateMagicNetwork } = useNetworkContext()

  const handleNetworkSelected = (networkOption: Network) => {
    if (networkOption !== selectedNetwork) {
      localStorage.setItem("network", networkOption)
      updateMagicNetwork(networkOption)
      console.log("SELECTED NETWORK: ", networkOption)
    }
  }

  return (
    <>
      <Center color="gray.500">Select Network</Center>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedNetwork}
        </MenuButton>
        <MenuList>
          {networkOptions.map((networkOption) => (
            <MenuItem
              key={networkOption}
              onClick={() => handleNetworkSelected(networkOption)}
            >
              <Flex align="center">
                {selectedNetwork === networkOption && (
                  <Box as={CheckIcon} marginRight="10px" />
                )}
                {networkOption}
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default NetworkSelect

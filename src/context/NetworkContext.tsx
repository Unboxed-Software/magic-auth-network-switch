import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { MagicNetwork, Network } from "../network.ts"

// Define the context
type NetworkContextType = {
  network: MagicNetwork | null
  updateMagicNetwork: (network: Network) => void
  selectedNetwork: Network
}

// Create context with a default value
const NetworkContext = createContext<NetworkContextType>({
  network: MagicNetwork.create(Network.Ethereum), // Default to Ethereum network
  updateMagicNetwork: () => {}, // Placeholder function, will be overwritten by provider
  selectedNetwork: Network.Ethereum, // Default selected network to Ethereum
})

// A custom hook to use context
export const useNetworkContext = () => useContext(NetworkContext)

// Provider component that wraps the app
export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Local state for selected network, default to Ethereum
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(
    Network.Ethereum
  )

  // Local state for magic network instance
  const [magicNetwork, setMagicNetwork] = useState<MagicNetwork | null>(null)

  // A function to update our magic network instance based on the selected network
  const updateMagicNetwork = useCallback(async (network: Network) => {
    const magicNetwork = MagicNetwork.create(network)
    setMagicNetwork(magicNetwork)
    setSelectedNetwork(network)
  }, [])

  useEffect(() => {
    // Try to get network from local storage, or default to Ethereum
    const storedNetwork =
      (localStorage.getItem("network") as Network | null) || Network.Ethereum
    updateMagicNetwork(storedNetwork)
  }, [])

  return (
    <NetworkContext.Provider
      value={{
        network: magicNetwork,
        selectedNetwork,
        updateMagicNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

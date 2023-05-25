import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { Network, EVM, Solana, Flow, MagicNetwork } from "../utils/networks"
import {} from "../utils/networks"

export type NetworkContextType = {
  network: MagicNetwork | null
  updateNetworkInstance: (network: Network) => void
  selectedNetwork: Network | null
}

export const NetworkContext = createContext<NetworkContextType>({
  network: null,
  updateNetworkInstance: () => {},
  selectedNetwork: null,
})

export const useNetworkContext = () => useContext(NetworkContext)

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(
    Network.Ethereum
  )
  const [networkInstance, setNetworkInstance] = useState<MagicNetwork | null>(
    null
  )
  const updateNetworkInstance = useCallback(async (network: Network) => {
    setSelectedNetwork(network)
    let networkInstance
    switch (network) {
      case Network.Solana:
        networkInstance = new Solana()
        break
      case Network.Flow:
        networkInstance = new Flow()
        break
      default:
        networkInstance = new EVM(network)
    }
    setNetworkInstance(networkInstance)
  }, [])

  useEffect(() => {
    const storedNetwork =
      (localStorage.getItem("network") as Network | null) || Network.Ethereum
    setSelectedNetwork(storedNetwork)
    updateNetworkInstance(storedNetwork)
  }, [])

  return (
    <NetworkContext.Provider
      value={{
        network: networkInstance,
        selectedNetwork,
        updateNetworkInstance,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

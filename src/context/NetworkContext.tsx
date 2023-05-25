import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { Networks } from "../utils/networks"
import { EVM, Solana, Flow, Network } from "../utils/network"

export type NetworkContextType = {
  network: Network | null
  updateNetworkInstance: (network: Networks) => void
  selectedNetwork: Networks | null
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
  const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>(
    Networks.Ethereum
  )
  const [networkInstance, setNetworkInstance] = useState<Network | null>(null)
  const updateNetworkInstance = useCallback(async (network: Networks) => {
    setSelectedNetwork(network)
    let networkInstance
    switch (network) {
      case Networks.Solana:
        networkInstance = new Solana()
        break
      case Networks.Flow:
        networkInstance = new Flow()
        break
      default:
        networkInstance = new EVM(network)
    }
    setNetworkInstance(networkInstance)
  }, [])

  useEffect(() => {
    const storedNetwork =
      (localStorage.getItem("network") as Networks | null) || Networks.Ethereum
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

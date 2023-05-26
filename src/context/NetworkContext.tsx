import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { MagicNetwork, EVM, Solana, Flow, Network } from "../network.ts"

export type NetworkContextType = {
  network: MagicNetwork | null
  updateMagicNetwork: (network: Network) => void
  selectedNetwork: Network
}

export const NetworkContext = createContext<NetworkContextType>({
  network: MagicNetwork.create(Network.Ethereum),
  updateMagicNetwork: () => {},
  selectedNetwork: Network.Ethereum,
})

export const useNetworkContext = () => useContext(NetworkContext)

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(
    Network.Ethereum
  )

  const [magicNetwork, setMagicNetwork] = useState<MagicNetwork | null>(null)

  const updateMagicNetwork = useCallback(async (network: Network) => {
    const magicNetwork = MagicNetwork.create(network)
    setMagicNetwork(magicNetwork)
    setSelectedNetwork(network)
  }, [])

  useEffect(() => {
    const storedNetwork =
      (localStorage.getItem("network") as Network | null) || Network.Ethereum
    setSelectedNetwork(storedNetwork)
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

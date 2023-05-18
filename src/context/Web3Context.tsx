import { createContext, useContext, useState, useEffect } from "react"
import Web3 from "web3"
import { useMagicContext } from "./MagicContext"
import { Networks } from "../utils/networks"

export type Web3ContextType = {
  web3: Web3 | null
}

const Web3Context = createContext<Web3ContextType>({
  web3: null,
})

export const useWeb3Context = () => useContext(Web3Context)

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { magic, selectedNetwork } = useMagicContext()
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null)

  useEffect(() => {
    if (
      selectedNetwork === Networks.Solana ||
      selectedNetwork === Networks.Flow
    )
      return
    const initializeWeb3 = async () => {
      const provider = await magic?.wallet.getProvider()
      setWeb3Instance(new Web3(provider))
    }

    initializeWeb3()
  }, [magic])

  return (
    <Web3Context.Provider value={{ web3: web3Instance }}>
      {children}
    </Web3Context.Provider>
  )
}

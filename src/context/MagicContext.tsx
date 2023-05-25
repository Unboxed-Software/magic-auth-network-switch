import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { Magic } from "magic-sdk"
import { Networks, formattedNetwork } from "../utils/networks"
import { OAuthExtension } from "@magic-ext/oauth"
import { SDKBase, InstanceWithExtensions } from "@magic-sdk/provider"
import { SolanaExtension } from "@magic-ext/solana"
import { FlowExtension } from "@magic-ext/flow"
import { SolanaConfig } from "@magic-ext/solana/dist/types/type"
import { FlowConfig } from "@magic-ext/flow/dist/types/type"

const magicKey = "pk_live_72F093D51AD88B5B"

type MagicInstanceWithOAuthExtension = InstanceWithExtensions<
  SDKBase,
  { oauth: OAuthExtension }
>

export type MagicContextType = {
  magic: MagicInstanceWithOAuthExtension | null
  updateMagicInstance: (network: Networks) => void
  selectedNetwork: Networks | null
}

const MagicContext = createContext<MagicContextType>({
  magic: null,
  updateMagicInstance: () => {},
  selectedNetwork: null,
})

export const useMagicContext = () => useContext(MagicContext)

export const MagicProvider = ({ children }: { children: React.ReactNode }) => {
  const [magicInstance, setMagicInstance] =
    useState<MagicInstanceWithOAuthExtension | null>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>(
    Networks.Ethereum
  )

  const updateMagicInstance = useCallback(async (network: Networks) => {
    setSelectedNetwork(network)

    let magic
    switch (network) {
      case Networks.Solana:
        magic = new Magic(magicKey, {
          extensions: [
            new SolanaExtension(formattedNetwork(network) as SolanaConfig),
            new OAuthExtension(),
          ],
        })
        break
      case Networks.Flow:
        magic = new Magic(magicKey, {
          extensions: [
            new FlowExtension(formattedNetwork(network) as FlowConfig),
            new OAuthExtension(),
          ],
        })
        break
      default:
        magic = new Magic(magicKey, {
          network: formattedNetwork(network),
          extensions: [new OAuthExtension()],
        })
    }
    setMagicInstance(magic)
  }, [])

  useEffect(() => {
    const storedNetwork =
      (localStorage.getItem("network") as Networks | null) || Networks.Ethereum
    setSelectedNetwork(storedNetwork)
    updateMagicInstance(storedNetwork)
  }, [])

  return (
    <MagicContext.Provider
      value={{
        magic: magicInstance,
        selectedNetwork,
        updateMagicInstance,
      }}
    >
      {children}
    </MagicContext.Provider>
  )
}

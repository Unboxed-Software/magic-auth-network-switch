import { EthNetworkConfiguration } from "magic-sdk"
import { FlowConfig } from "@magic-ext/flow/dist/types/type"
import { SolanaConfig } from "@magic-ext/solana/dist/types/type"

export enum Network {
  Ethereum = "Ethereum (Goerli)",
  Sepolia = "Ethereum (Sepolia)",
  Polygon = "Polygon (Mumbai)",
  Optimism = "Optimism (Goerli)",
  Solana = "Solana (Devnet)",
  Flow = "Flow (Testnet)",
}

export const formattedNetwork = (
  selectedNetwork: Network
): EthNetworkConfiguration | FlowConfig | SolanaConfig => {
  switch (selectedNetwork) {
    case Network.Flow:
      return {
        rpcUrl: "https://rest-testnet.onflow.org",
        network: "testnet",
      }
    case Network.Solana:
      return {
        rpcUrl: "https://api.devnet.solana.com",
      }
    case Network.Optimism:
      return {
        rpcUrl: "https://goerli.optimism.io/",
        chainId: 420,
      }
    case Network.Polygon:
      return {
        rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        chainId: 80001,
      }
    case Network.Sepolia:
      return {
        rpcUrl: "https://rpc2.sepolia.org/",
        chainId: 11155111,
      }
    default:
      return {
        rpcUrl:
          "https://eth-goerli.g.alchemy.com/v2/3jKhhva6zBqwp_dnwPlF4d0rFZhu2pjD/",
        chainId: 5,
      }
  }
}

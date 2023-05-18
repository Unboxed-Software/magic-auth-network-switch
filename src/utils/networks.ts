import { EthNetworkConfiguration } from "magic-sdk"
import { FlowConfig } from "@magic-ext/flow/dist/types/type"
import { SolanaConfig } from "@magic-ext/solana/dist/types/type"

export enum Networks {
  Ethereum = "Ethereum (Goerli)",
  Sepolia = "Ethereum (Sepolia)",
  Polygon = "Polygon (Mumbai)",
  Optimism = "Optimism (Goerli)",
  Solana = "Solana (Devnet)",
  Flow = "Flow (Testnet)",
}

export const formattedNetwork = (
  selectedNetwork: Networks
): EthNetworkConfiguration | FlowConfig | SolanaConfig => {
  // ): any => {
  switch (selectedNetwork) {
    case Networks.Flow:
      return {
        rpcUrl: "https://rest-testnet.onflow.org",
        network: "testnet",
      }
    case Networks.Solana:
      return {
        rpcUrl: "https://api.devnet.solana.com",
      }
    case Networks.Optimism:
      return {
        rpcUrl: "https://goerli.optimism.io/",
        chainId: 420,
      }
    case Networks.Polygon:
      return {
        rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        chainId: 80001,
      }
    case Networks.Sepolia:
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

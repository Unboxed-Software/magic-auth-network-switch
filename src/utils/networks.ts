import { EthNetworkConfiguration } from "magic-sdk"

export enum Networks {
  Ethereum = "Ethereum (Goerli)",
  Sepolia = "Ethereum (Sepolia)",
  Polygon = "Polygon (Mumbai)",
  Optimism = "Optimism (Goerli)",
  Solana = "Solana (Devnet)",
}

export const formattedNetwork = (
  selectedNetwork: Networks
): EthNetworkConfiguration => {
  switch (selectedNetwork) {
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
        rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",
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

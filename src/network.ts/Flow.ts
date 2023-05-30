import { MagicNetwork } from "./MagicNetwork"
import { Network } from "./supported-networks"
/// @ts-ignore
import * as fcl from "@onflow/fcl-1.3.2"

// The Flow class extends the abstract MagicNetwork class
export class Flow extends MagicNetwork {
  public network: Network
  constructor() {
    super()

    // Setting the network type to Flow
    this.network = Network.Flow

    // Calling the initialize method from MagicNetwork
    this.initialize()
  }

  // Method to fetch the balance of a user in Flow blockchain
  public async fetchBalance(userPublicKey: string): Promise<number> {
    // Configuring to connect to the Flow testnet
    fcl.config({
      "accessNode.api": "https://rest-testnet.onflow.org",
    })
    const account = await fcl.account(userPublicKey)
    return account.balance
  }
}

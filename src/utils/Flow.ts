import { MagicNetwork } from "./MagicNetwork"
import { Network } from "./supported-networks"
/// @ts-ignore
import * as fcl from "@onflow/fcl-1.3.2"

export class Flow extends MagicNetwork {
  public network: Network
  constructor() {
    super()
    this.network = Network.Flow
    this.initialize()
  }

  public async fetchBalance(userPublicKey: string): Promise<number> {
    fcl.config({
      "accessNode.api": "https://rest-testnet.onflow.org",
    })
    const account = await fcl.account(userPublicKey)
    return account.balance
  }
}

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { MagicNetwork } from "./MagicNetwork"
import { Network } from "./supported-networks"

export class Solana extends MagicNetwork {
  private connection: Connection
  public network: Network
  constructor() {
    super()
    this.network = Network.Solana
    this.connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    )

    this.initialize()
  }

  public async fetchBalance(userPublicKey: string): Promise<number> {
    const balance = await this.connection.getBalance(
      new PublicKey(userPublicKey)
    )
    return balance / LAMPORTS_PER_SOL
  }
}

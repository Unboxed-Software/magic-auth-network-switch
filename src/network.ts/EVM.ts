import Web3 from "web3"
import { MagicNetwork } from "./MagicNetwork"
import { Network } from "./supported-networks"

export class EVM extends MagicNetwork {
  web3Instance: Web3 | null = null

  public network: Network
  constructor(network: Network) {
    super()
    this.network = network
    this.initialize()
  }

  async initializeWeb3(): Promise<void> {
    const provider = await this.magic?.wallet.getProvider()
    this.web3Instance = new Web3(provider)
  }

  public async fetchBalance(userPublicKey: string): Promise<number> {
    if (!this.web3Instance) {
      await this.initializeWeb3()
    }

    if (!this.web3Instance) {
      throw new Error("Web3 instance is not initialized yet.")
    }

    const balance = await this.web3Instance.eth.getBalance(userPublicKey)
    const balanceInEth = this.web3Instance.utils
      .fromWei(balance)
      .substring(0, 7)
    return parseFloat(balanceInEth)
  }
}

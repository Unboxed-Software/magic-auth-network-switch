import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
/// @ts-ignore
import * as fcl from "@onflow/fcl-1.3.2"
import { OAuthExtension } from "@magic-ext/oauth"
import { SDKBase, InstanceWithExtensions } from "@magic-sdk/provider"
import { SolanaExtension } from "@magic-ext/solana"
import { FlowExtension } from "@magic-ext/flow"
import { SolanaConfig } from "@magic-ext/solana/dist/types/type"
import { FlowConfig } from "@magic-ext/flow/dist/types/type"
import { Networks, formattedNetwork } from "./networks"
import { Magic } from "magic-sdk"
import Web3 from "web3"

const magicKey = "pk_live_72F093D51AD88B5B"

type MagicInstanceWithOAuthExtension = InstanceWithExtensions<
  SDKBase,
  { oauth: OAuthExtension }
>

export abstract class Network {
  public magic: MagicInstanceWithOAuthExtension | null = null

  protected initializeMagicInstance(network: Networks): void {
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
    this.magic = magic
  }

  public abstract fetchBalance(userPublicKey: string): Promise<number>
}

export class Solana extends Network {
  constructor() {
    super()
    this.initializeMagicInstance(Networks.Solana)
  }

  public async fetchBalance(userPublicKey: string): Promise<number> {
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    )
    const balance = await connection.getBalance(new PublicKey(userPublicKey))
    return balance / LAMPORTS_PER_SOL
  }
}

export class Flow extends Network {
  constructor() {
    super()
    this.initializeMagicInstance(Networks.Flow)
  }

  public async fetchBalance(userPublicKey: string): Promise<number> {
    fcl.config({
      "accessNode.api": "https://rest-testnet.onflow.org",
    })
    const account = await fcl.account(userPublicKey)
    return account.balance
  }
}

export class EVM extends Network {
  public web3Instance: Web3 | null = null

  constructor(network: Networks) {
    super()
    this.initializeMagicInstance(network)
  }

  public async initializeWeb3(): Promise<void> {
    const provider = await this.magic?.wallet.getProvider()
    this.web3Instance = new Web3(provider)
  }

  public async fetchBalance(userPublicKey: string): Promise<number> {
    await this.initializeWeb3()

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

import { OAuthExtension, OAuthProvider } from "@magic-ext/oauth"
import { SDKBase, InstanceWithExtensions } from "@magic-sdk/provider"
import { SolanaExtension } from "@magic-ext/solana"
import { FlowExtension } from "@magic-ext/flow"
import { SolanaConfig } from "@magic-ext/solana/dist/types/type"
import { FlowConfig } from "@magic-ext/flow/dist/types/type"
import { Network, formattedNetwork } from "./supported-networks"
import { Magic } from "magic-sdk"

// Publishable API Key for Magic Auth
const magicKey = "pk_live_72F093D51AD88B5B"

// Type definition for Magic instance with OAuth Extension
type MagicInstanceWithOAuthExtension = InstanceWithExtensions<
  SDKBase,
  { oauth: OAuthExtension }
>

// Abstract class to handle magic network-specific operations
export abstract class MagicNetwork {
  public magic: MagicInstanceWithOAuthExtension | null = null
  public abstract network: Network

  // Method to initialize Magic instance based on network type
  protected initialize(): void {
    let magic
    switch (this.network) {
      case Network.Solana:
        magic = new Magic(magicKey, {
          extensions: [
            new SolanaExtension(formattedNetwork(this.network) as SolanaConfig),
            new OAuthExtension(),
          ],
        })
        break
      case Network.Flow:
        magic = new Magic(magicKey, {
          extensions: [
            new FlowExtension(formattedNetwork(this.network) as FlowConfig),
            new OAuthExtension(),
          ],
        })
        break
      default:
        magic = new Magic(magicKey, {
          network: formattedNetwork(this.network),
          extensions: [new OAuthExtension()],
        })
    }
    this.magic = magic
  }

  // Static method to create MagicNetwork instance based on network type
  public static create(network: Network): MagicNetwork {
    switch (network) {
      case Network.Solana: {
        const { Solana } = require("./Solana")
        return new Solana()
      }
      case Network.Flow: {
        const { Flow } = require("./Flow")
        return new Flow()
      }
      default: {
        const { EVM } = require("./EVM")
        return new EVM(network)
      }
    }
  }

  // Abstract method to fetch balance, implementation would be network-specific
  public abstract fetchBalance(userPublicKey: string): Promise<number>

  // Method to login with OTP using Magic SDK
  public async loginWithOTP(email: string): Promise<void> {
    await this.magic?.auth.loginWithEmailOTP({ email })
  }

  // Method to logout using Magic SDK
  public async logout() {
    return await this.magic?.user.logout()
  }

  // Method to login with social provider using Magic SDK
  public async loginWithSocial(provider: OAuthProvider, redirectUri: string) {
    return await this.magic?.oauth.loginWithRedirect({
      provider,
      redirectURI: redirectUri,
    })
  }

  // Method to get redirect result after social login using Magic SDK
  public async getRedirectResult() {
    return await this.magic?.oauth.getRedirectResult()
  }

  // Method to check if user is logged in using Magic SDK
  public async isLoggedIn() {
    return await this.magic?.user.isLoggedIn()
  }

  // Method to get user information using Magic SDK
  public async getInfo() {
    return await this.magic?.user.getInfo()
  }
}

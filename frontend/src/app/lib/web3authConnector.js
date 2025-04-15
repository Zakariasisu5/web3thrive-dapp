import { Web3Auth } from "@web3auth/modal"
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { Connector } from "wagmi"

export class Web3AuthConnector extends Connector {
  constructor({ chains, clientId }) {
    super()
    this.chains = chains
    this.clientId = clientId

    this.web3auth = new Web3Auth({
      clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: '0x8157',
        rpcTarget: 'https://curtis.rpc.caldera.xyz/http',
        displayName: 'ApeChain Testnet',
        blockExplorer: 'https://curtis.explorer.caldera.xyz',
        ticker: 'APE',
        tickerName: 'ApeCoin',
      },
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    })

    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: {
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x8157',
          rpcTarget: 'https://curtis.rpc.caldera.xyz/http',
        },
      },
    })

    this.web3auth.configureAdapter({ adapter: privateKeyProvider })
  }

  async connect() {
    await this.web3auth.initModal()
    const provider = await this.web3auth.connect()
    const accounts = await provider.request({ method: 'eth_accounts' })

    return {
      account: accounts[0],
      provider,
    }
  }

  async disconnect() {
    await this.web3auth.logout()
  }

  async getAccount() {
    const accounts = await this.web3auth.provider.request({ method: 'eth_accounts' })
    return accounts[0]
  }

  async getProvider() {
    return this.web3auth.provider
  }

  async isAuthorized() {
    return !!this.web3auth.connected
  }
}
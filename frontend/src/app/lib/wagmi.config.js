import { configureChains, createConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { apeChain } from './chains'
import { Web3AuthConnector } from './web3authConnector'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { defineChain } from 'viem'
import { http } from 'viem'

const clientId = 'BDIff3ZkWHu6PSF_wY8tyZsoa1eGh-wzoEazC4y-Ey9KDO78FqpXVfSnzKsRxBlNkNhJmsId7wo8Cd6ONFheq4Y'

const { chains, publicClient } = defineChain(
  [apeChain],
  [
    jsonRpcProvider({
      rpc: () => ({ http: apeChain.rpcUrls.default.http[0] }),
    }),
    publicProvider(),
  ]
)

const { wallets } = getDefaultWallets({
  appName: 'Web3Thrive',
  projectId: '6f03923749def6e38136d11c7f08a112',
  chains,
})

const connectors = [
  ...wallets,
  {
    groupName: 'Social Login',
    wallets: [
      {
        id: 'web3auth',
        name: 'Web3Auth',
        iconUrl: 'https://web3auth.io/images/web3auth-logo.svg',
        iconBackground: '#fff',
        createConnector: () => {
          const connector = new Web3AuthConnector({ chains, clientId })
          return {
            connector,
          }
        },
      },
    ],
  },
]

export const wagmiConfig = createConfig({
chains: [apeChain],
  transports: {
    [apeChain.id]: http('https://curtis.rpc.caldera.xyz/http'), // your ApeChain RPC here
  },
  autoConnect: true,
  connectors,
  publicClient,
})

export { chains }
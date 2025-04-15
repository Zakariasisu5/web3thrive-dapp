'use client';

import {http, createStorage, cookieStorage} from 'wagmi';
import { sepolia, arbitrumSepolia } from 'viem/chains';
import {Chain, getDefaultConfig} from '@rainbow-me/rainbowkit';
import { chainConfig } from 'viem/zksync';
import { multicall } from 'viem/actions';

const projectId =  '6f03923749def6e38136d11c7f08a112';

const curtis = {
    id: 33111,
    name: "Curtis",
    nativeCurrency : {name: 'ApeCoin', symbol: 'APE', decimals: 18},
    rpcUrls : {
        default: {http: ['https://curtis.betteruptime.com/']},
    },

    blockExplorers : {
        default : {
            name: 'nitro-curtis explorer', url :'https://curtis.explorer.caldera.xyz/'
        }
    },
    contract : {
        multicall3: {
            address: '0x4dA8Dd72d43d7e26ACe1188d6ACa52d1b3CD3F65',
            blockCreated: 9244266
        },
        standardGateway: {
            address: '0x5b6cbA57e0BB050CBD1145C8B2C70BC80d997DA5'
        },
        rollup: {
            address: '0x276b8853606a63954A0FD903bb319AbCd9263830',
  
        }
    }

}
    

const supportedChain = [sepolia, arbitrumSepolia, curtis];

export const config = getDefaultConfig({
    appName: 'Wallet Connection',
    projectId,
    chains: supportedChain,
    ssr: true, // dApp uses server side rendering (SSR)
    storage: createStorage({
        storage: cookieStorage,
    }),

    transports: supportedChain.reduce((obj, chain) =>({
        ...obj,
        [chain.id]: http()}), {}
    )}
);
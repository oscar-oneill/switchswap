import compound from '../../node_modules/cryptocurrency-icons/svg/color/comp.svg';
import crv from '../../node_modules/cryptocurrency-icons/svg/color/crv.svg';
import dai from '../../node_modules/cryptocurrency-icons/svg/color/dai.svg';
import eth from '../../node_modules/cryptocurrency-icons/svg/color/eth.svg';
import uniswap from '../../node_modules/cryptocurrency-icons/svg/color/uni.svg';
import usdc from '../../node_modules/cryptocurrency-icons/svg/color/usdc.svg';
import usdt from '../../node_modules/cryptocurrency-icons/svg/color/usdt.svg';
import aave from '../../node_modules/cryptocurrency-icons/svg/color/aave.svg';

import uni from '../assets/images/UNI.png'
import sushi from '../assets/images/SUSHI.png'
import shiba from '../assets/images/SHIBA.png'

export const logoMapping: any = {
    'AAVE': aave,
    'COMP': compound,
    'CRV': crv,
    'DAI': dai,
    'UNI': uniswap,
    'USDC': usdc,
    'USDT': usdt,
    'WETH': eth,
}

export const protocols: any = [
    {
        protocol: 'Uniswap',
        address: process.env.REACT_APP_CONTRACT_ADDRESS_UNI
    },
    {
        protocol: 'SushiSwap',
        address: process.env.REACT_APP_CONTRACT_ADDRESS_SUSHI
    },
    {
        protocol: 'ShibaSwap',
        address: process.env.REACT_APP_CONTRACT_ADDRESS_SHIBA
    }
]

export const tokens: any = [
    {
        displayName: 'AAVE',
        address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        decimals: 18
    },
    {
        displayName: 'COMP',
        address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        decimals: 18
    },
    {
        displayName: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        decimals: 6
    },
    {
        displayName: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6
    },
    {
        displayName: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        decimals: 18
    },
    {
        displayName: 'CRV',
        address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
        decimals: 18
    },
    {
        displayName: 'UNI',
        address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        decimals: 18
    },
    {
        displayName: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        decimals: 18
    }
]

export const protocolLogos: any = {
    'Uniswap': uni,
    'SushiSwap': sushi,
    'ShibaSwap': shiba
}
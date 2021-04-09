import { BigInt, TypedMap } from '@graphprotocol/graph-ts'

export let oneInteger = BigInt.fromI32(1)
export let zeroInteger = BigInt.fromI32(0)
export let zeroDecimal = zeroInteger.toBigDecimal()

export let dayInMs = BigInt.fromI32(86400000)
export let weekInMs = BigInt.fromI32(604800000)
export let monthInMs = BigInt.fromI32(2629800000)

export let initialCounterHexId = oneInteger.toHex()

export const ETH = 'stackETH'
export const USDC = 'stackUSDC'
export const WBTC = 'stackWBTC'
export const CONTRACT_ETH = '0x0a9f8172e5d3ffa468cc2a1392db2fe394e9090b'
export const CONTRACT_USDC = '0x5d3f11fb8ef06356b0f5a906847d6171bb08a31a'
export const CONTRACT_WBTC = ''

export let tokenSymbols = new TypedMap<string, string>()

tokenSymbols.set(CONTRACT_ETH, ETH)
tokenSymbols.set(CONTRACT_USDC, USDC)
tokenSymbols.set(CONTRACT_WBTC, WBTC)

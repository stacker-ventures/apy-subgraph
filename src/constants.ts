export let oneInteger = BigInt.fromI32(1)
export let zeroInteger = BigInt.fromI32(0)
export let zeroDecimal = zeroInteger.toBigDecimal()

export let dayInMs = BigInt.fromI32(86400000)
export let weekInMs = BigInt.fromI32(604800000)
export let monthInMs = BigInt.fromI32(2629800000)

export let initialCounterHexId = oneInteger.toHex()

import { BigInt } from "@graphprotocol/graph-ts"

export function secsToMs(secs: BigInt): BigInt {
	return secs.times(BigInt.fromI32(1000))
}

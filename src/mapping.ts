import { BigInt } from "@graphprotocol/graph-ts"

import { ProfitDeclared } from "../generated/Statistics/Statistics"
import { Profit, ProfitCounter, GeneralStatistics } from "../generated/schema"

export function handleProfitDeclared(event: ProfitDeclared): void {
  let dayInMs = BigInt.fromI32(86400000)
  let weekInMs = BigInt.fromI32(604800000)
  let monthInMs = BigInt.fromI32(2629800000)

  let zero = BigInt.fromI32(0)
  let one = BigInt.fromI32(1)

  // Handles counter updates
  let initialCounterHexId = one.toHex();
  let counter = ProfitCounter.load(initialCounterHexId)

  if (counter == null) {
    counter = new ProfitCounter(initialCounterHexId)

    counter.count = one
  } else {
    counter.count = one.plus(counter.count)
  }

  counter.save()

  // Handles profit record creation
  let profit = new Profit(counter.count.toHex())

  profit.profit = event.params.profit
  profit.amount = event.params.amount
  profit.timestamp = event.params.timestamp
  profit.totalAmountInPool = event.params.totalAmountInPool
  profit.totalSharesInPool = event.params.totalSharesInPool

  profit.save()

  // APY Calculations...
  let initialProfit = profit.id == initialCounterHexId ? profit : Profit.load(initialCounterHexId)

  let statistics = GeneralStatistics.load(initialCounterHexId)

  if (statistics == null) {
    statistics = new GeneralStatistics(initialCounterHexId)
  }

  statistics.APY_all_time = calculateAPY(profit, initialProfit as Profit)

  let nextIdToFetch = counter.count.minus(one)

  if (nextIdToFetch.equals(zero)) {
    statistics.APY_past_day = zero
    statistics.APY_past_week = zero
    statistics.APY_past_month = zero
  }

  let now = event.block.timestamp

  while (nextIdToFetch.gt(zero)) {
    let previousProfit = Profit.load(nextIdToFetch.toHex())

    if (previousProfit == null) {
      break;
    }

    if (now.minus(previousProfit.timestamp).ge(monthInMs) && statistics.APY_past_month !== zero) {
      statistics.APY_past_month = calculateAPY(profit, previousProfit as Profit)

      break
    }

    if (now.minus(previousProfit.timestamp).ge(weekInMs) && statistics.APY_past_week !== zero) {
      statistics.APY_past_week = calculateAPY(profit, previousProfit as Profit)
    } else if (now.minus(previousProfit.timestamp).ge(dayInMs) && statistics.APY_past_day !== zero) {
      statistics.APY_past_day = calculateAPY(profit, previousProfit as Profit)
    }

    nextIdToFetch = nextIdToFetch.minus(one)
  }

  statistics.save()
}

function calculateAPY(currentProfit: Profit, intervalProfit: Profit): BigInt {
  let one = BigInt.fromI32(1)

  return currentProfit.totalAmountInPool
    .div(intervalProfit.totalAmountInPool)
    .minus(one)
    .times(BigInt.fromI32(100))
}

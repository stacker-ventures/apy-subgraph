import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"

import { ProfitDeclared } from "../generated/Statistics/Statistics"
import { Profit, ProfitCounter, GeneralStatistics } from "../generated/schema"

let oneInteger = BigInt.fromI32(1)
let zeroInteger = BigInt.fromI32(0)
let zeroDecimal = zeroInteger.toBigDecimal()

let dayInMs = BigInt.fromI32(86400000)
let weekInMs = BigInt.fromI32(604800000)
let monthInMs = BigInt.fromI32(2629800000)

let initialCounterHexId = oneInteger.toHex()

export function handleProfitDeclared(event: ProfitDeclared): void {
  // Handles counter updates
  let counter = increaseProfitCounter()

  // Handles profit record creation
  let profit = new Profit(counter.count.toHex())

  profit.profit = event.params.profit
  profit.amount = event.params.amount
  profit.timestamp = event.params.timestamp
  profit.baseFeeTotal = event.params.baseFeeTotal
  profit.totalAmountInPool = event.params.totalAmountInPool
  profit.totalSharesInPool = event.params.totalSharesInPool
  profit.performanceFeeTotal = event.params.performanceFeeTotal

  profit.save()

  // APY Calculations...
  let initialProfit = profit.id == initialCounterHexId ? profit : Profit.load(initialCounterHexId)

  let statistics = GeneralStatistics.load(initialCounterHexId)

  if (statistics == null) {
    statistics = new GeneralStatistics(initialCounterHexId)
  }

  statistics.APY_all_time = calculateAPY(profit, initialProfit as Profit)

  let nextIdToFetch = counter.count.minus(oneInteger)

  if (nextIdToFetch.equals(zeroInteger)) {
    statistics.APY_past_day = zeroDecimal
    statistics.APY_past_week = zeroDecimal
    statistics.APY_past_month = zeroDecimal
  }

  let now = event.block.timestamp

  while (nextIdToFetch.gt(zeroInteger)) {
    let previousProfit = Profit.load(nextIdToFetch.toHex())

    if (previousProfit == null) {
      break;
    }

    if (now.minus(previousProfit.timestamp).ge(monthInMs) && statistics.APY_past_month != zeroDecimal) {
      statistics.APY_past_month = calculateAPY(profit, previousProfit as Profit)

      break
    }

    if (now.minus(previousProfit.timestamp).ge(weekInMs) && statistics.APY_past_week != zeroDecimal) {
      statistics.APY_past_week = calculateAPY(profit, previousProfit as Profit)
    } else if (now.minus(previousProfit.timestamp).ge(dayInMs) && statistics.APY_past_day != zeroDecimal) {
      statistics.APY_past_day = calculateAPY(profit, previousProfit as Profit)
    }

    nextIdToFetch = nextIdToFetch.minus(oneInteger)
  }

  statistics.save()
}

function increaseProfitCounter(): ProfitCounter {
  let counter = ProfitCounter.load(initialCounterHexId)

  if (counter == null) {
    counter = new ProfitCounter(initialCounterHexId)

    counter.count = oneInteger
  } else {
    counter.count = oneInteger.plus(counter.count)
  }

  counter.save()

  return counter
}

function calculateAPY(currentProfit: Profit, intervalProfit: Profit): BigDecimal {
  return currentProfit.totalAmountInPool.toBigDecimal()
    .div(intervalProfit.totalAmountInPool.toBigDecimal())
    .minus(oneInteger.toBigDecimal())
    .times(BigDecimal.fromString('100'))
}

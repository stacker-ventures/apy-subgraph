import { BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts"

import { ProfitDeclared } from "../generated/Statistics/Statistics"
import { Profit, ProfitCounter, GeneralStatistics } from "../generated/schema"
import { initialCounterHexId, oneInteger, zeroInteger, zeroDecimal, dayInMs, weekInMs, monthInMs, tokenSymbols } from "./constants"


export function handleProfitDeclared(event: ProfitDeclared): void {
  // Handles counter updates
  let counter = increaseProfitCounter(event)

  // Handles profit record creation
  let profit = new Profit(counter.count.toHex())

  profit.profit = event.params.profit
  profit.amount = event.params.amount
  profit.timestamp = event.params.timestamp
  profit.baseFeeTotal = event.params.baseFeeTotal
  profit.totalAmountInPool = event.params.totalAmountInPool
  profit.totalSharesInPool = event.params.totalSharesInPool
  profit.performanceFeeTotal = event.params.performanceFeeTotal
  profit.tokenSymbol = tokenSymbols.get(event.address.toHex()) as string

  profit.save()

  // APY Calculations...
  let initialProfit = profit.id == initialCounterHexId ? profit : Profit.load(initialCounterHexId)

  let statistics = GeneralStatistics.load(event.address.toHex())

  if (statistics == null) {
    statistics = new GeneralStatistics(event.address.toHex())
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

function increaseProfitCounter(event: ethereum.Event): ProfitCounter {
  let id = event.address.toHex()
  let counter = ProfitCounter.load(id)

  if (counter == null) {
    counter = new ProfitCounter(id)

    counter.count = oneInteger
  } else {
    counter.count = oneInteger.plus(counter.count)
  }

  counter.save()

  return counter as ProfitCounter
}

function calculateAPY(currentProfit: Profit, intervalProfit: Profit): BigDecimal {
  return currentProfit.totalAmountInPool.toBigDecimal()
    .div(intervalProfit.totalAmountInPool.toBigDecimal())
    .minus(oneInteger.toBigDecimal())
    .times(BigDecimal.fromString('100'))
}

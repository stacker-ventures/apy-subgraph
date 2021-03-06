// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Profit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Profit entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Profit entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Profit", id.toString(), this);
  }

  static load(id: string): Profit | null {
    return store.get("Profit", id) as Profit | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get profit(): boolean {
    let value = this.get("profit");
    return value.toBoolean();
  }

  set profit(value: boolean) {
    this.set("profit", Value.fromBoolean(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get tokenSymbol(): string {
    let value = this.get("tokenSymbol");
    return value.toString();
  }

  set tokenSymbol(value: string) {
    this.set("tokenSymbol", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get totalAmountInPool(): BigInt {
    let value = this.get("totalAmountInPool");
    return value.toBigInt();
  }

  set totalAmountInPool(value: BigInt) {
    this.set("totalAmountInPool", Value.fromBigInt(value));
  }

  get totalSharesInPool(): BigInt {
    let value = this.get("totalSharesInPool");
    return value.toBigInt();
  }

  set totalSharesInPool(value: BigInt) {
    this.set("totalSharesInPool", Value.fromBigInt(value));
  }

  get performanceFeeTotal(): BigInt {
    let value = this.get("performanceFeeTotal");
    return value.toBigInt();
  }

  set performanceFeeTotal(value: BigInt) {
    this.set("performanceFeeTotal", Value.fromBigInt(value));
  }

  get baseFeeTotal(): BigInt {
    let value = this.get("baseFeeTotal");
    return value.toBigInt();
  }

  set baseFeeTotal(value: BigInt) {
    this.set("baseFeeTotal", Value.fromBigInt(value));
  }
}

export class GeneralStatistic extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save GeneralStatistic entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save GeneralStatistic entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("GeneralStatistic", id.toString(), this);
  }

  static load(id: string): GeneralStatistic | null {
    return store.get("GeneralStatistic", id) as GeneralStatistic | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get APY_all_time(): BigDecimal {
    let value = this.get("APY_all_time");
    return value.toBigDecimal();
  }

  set APY_all_time(value: BigDecimal) {
    this.set("APY_all_time", Value.fromBigDecimal(value));
  }

  get APY_past_day(): BigDecimal {
    let value = this.get("APY_past_day");
    return value.toBigDecimal();
  }

  set APY_past_day(value: BigDecimal) {
    this.set("APY_past_day", Value.fromBigDecimal(value));
  }

  get APY_past_week(): BigDecimal {
    let value = this.get("APY_past_week");
    return value.toBigDecimal();
  }

  set APY_past_week(value: BigDecimal) {
    this.set("APY_past_week", Value.fromBigDecimal(value));
  }

  get APY_past_month(): BigDecimal {
    let value = this.get("APY_past_month");
    return value.toBigDecimal();
  }

  set APY_past_month(value: BigDecimal) {
    this.set("APY_past_month", Value.fromBigDecimal(value));
  }
}

export class ProfitCounter extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ProfitCounter entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ProfitCounter entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ProfitCounter", id.toString(), this);
  }

  static load(id: string): ProfitCounter | null {
    return store.get("ProfitCounter", id) as ProfitCounter | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }
}

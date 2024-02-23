import { type UniqueEntityID } from '../unique-entity-id'

export abstract class DomainEvent<T extends { id: UniqueEntityID }> {
  public readonly name: string
  public readonly occurredOn: Date
  private readonly _payload: T

  protected constructor (payload: T) {
    const thisClass = Reflect.getPrototypeOf(this) as object

    this.occurredOn = new Date()
    this.name = thisClass.constructor.name
    this._payload = payload
  }

  public get payload (): T {
    return this._payload
  }
}

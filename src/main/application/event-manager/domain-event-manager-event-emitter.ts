import { Injectable } from '@nestjs/common'
import EventEmitter2 from 'eventemitter2'
import type { AggregateRoot } from '../../../shared/domain'
import type { DomainEventManager } from '@/shared/domain/events'

@Injectable()
export class DomainEventManagerEventEmitter implements DomainEventManager {
  private readonly domainEventSubscriber: EventEmitter2

  constructor () {
    this.domainEventSubscriber = new EventEmitter2({
      wildcard: true
    })
  }

  registerDomainEvent (eventName: string, handler: () => any): void {
    this.domainEventSubscriber.on(eventName, handler)
  }

  async publishDomainEvent (aggregateRoot: AggregateRoot<any>): Promise<void> {
    for (const event of aggregateRoot.uncommittedEvents) {
      aggregateRoot.markEventsAsDispatched(event)
      await this.domainEventSubscriber.emitAsync(event.name, event)
    }
  }
}

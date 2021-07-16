import { Publisher } from './base-publisher';
import { Subjects } from './subjects';
import { TickedCreatedEvent } from './ticket-created-event';

export class TicketCreatedPublisher extends Publisher<TickedCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

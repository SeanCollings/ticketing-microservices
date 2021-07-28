import { Publisher, Subjects, TickedCreatedEvent } from '@srctickets/common';

export class TicketCreatedPublisher extends Publisher<TickedCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

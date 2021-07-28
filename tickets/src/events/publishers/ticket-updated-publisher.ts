import { Publisher, Subjects, TickedUpdatedEvent } from '@srctickets/common';

export class TicketUpdatedPublisher extends Publisher<TickedUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

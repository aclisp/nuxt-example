import type { EventHandler, EventHandlerRequest } from 'h3'
import { directusErrorMessage } from '~/utils/directus-error-message'

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler
      const response = await handler(event)
      // do something after the route handler
      return response
    }
    catch (err) {
      // Error handling
      return { ok: false, msg: directusErrorMessage(err) }
    }
  })

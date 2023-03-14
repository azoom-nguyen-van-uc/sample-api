/**
 * @type {import('express').RequestHandler}
 */
import bearerToken from '@middleware/bearer-token'
import authenticateToken from '@middleware/authenticate-token'

export { bearerToken as middleware, authenticateToken as middleware1 }

const middleware = {}

middleware['authed'] = require('../middleware/authed.js')
middleware['authed'] = middleware['authed'].default || middleware['authed']

middleware['before_auth'] = require('../middleware/before_auth.js')
middleware['before_auth'] = middleware['before_auth'].default || middleware['before_auth']

export default middleware

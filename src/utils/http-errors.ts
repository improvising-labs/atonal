import { HttpError } from '../http/core/error'

export class BadRequest extends HttpError {
  constructor(message?: string) {
    super(400, message)
  }
}

export class Unauthorized extends HttpError {
  constructor(message?: string) {
    super(401, message)
  }
}

export class PaymentRequired extends HttpError {
  constructor(message?: string) {
    super(402, message)
  }
}

export class Forbidden extends HttpError {
  constructor(message?: string) {
    super(403, message)
  }
}

export class NotFound extends HttpError {
  constructor(message?: string) {
    super(404, message)
  }
}

export class MethodNotAllowed extends HttpError {
  constructor(message?: string) {
    super(405, message)
  }
}

export class NotAcceptable extends HttpError {
  constructor(message?: string) {
    super(406, message)
  }
}

export class ProxyAuthenticationRequired extends HttpError {
  constructor(message?: string) {
    super(407, message)
  }
}

export class RequestTimeout extends HttpError {
  constructor(message?: string) {
    super(408, message)
  }
}

export class Conflict extends HttpError {
  constructor(message?: string) {
    super(409, message)
  }
}

export class Gone extends HttpError {
  constructor(message?: string) {
    super(410, message)
  }
}

export class LengthRequired extends HttpError {
  constructor(message?: string) {
    super(411, message)
  }
}

export class PreconditionFailed extends HttpError {
  constructor(message?: string) {
    super(412, message)
  }
}

export class PayloadTooLarge extends HttpError {
  constructor(message?: string) {
    super(413, message)
  }
}

export class URITooLong extends HttpError {
  constructor(message?: string) {
    super(414, message)
  }
}

export class UnsupportedMediaType extends HttpError {
  constructor(message?: string) {
    super(415, message)
  }
}

export class RangeNotSatisfiable extends HttpError {
  constructor(message?: string) {
    super(416, message)
  }
}

export class ExpectationFailed extends HttpError {
  constructor(message?: string) {
    super(417, message)
  }
}

export class IamATeapot extends HttpError {
  constructor(message?: string) {
    super(418, message)
  }
}

export class MisdirectedRequest extends HttpError {
  constructor(message?: string) {
    super(421, message)
  }
}

export class UnprocessableEntity extends HttpError {
  constructor(message?: string) {
    super(422, message)
  }
}

export class Locked extends HttpError {
  constructor(message?: string) {
    super(423, message)
  }
}

export class FailedDependency extends HttpError {
  constructor(message?: string) {
    super(424, message)
  }
}

export class TooEarly extends HttpError {
  constructor(message?: string) {
    super(425, message)
  }
}

export class UpgradeRequired extends HttpError {
  constructor(message?: string) {
    super(426, message)
  }
}

export class PreconditionRequired extends HttpError {
  constructor(message?: string) {
    super(428, message)
  }
}

export class TooManyRequests extends HttpError {
  constructor(message?: string) {
    super(429, message)
  }
}

export class RequestHeaderFieldsTooLarge extends HttpError {
  constructor(message?: string) {
    super(431, message)
  }
}

export class UnavailableForLegalReasons extends HttpError {
  constructor(message?: string) {
    super(451, message)
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(500, message)
  }
}

export class NotImplemented extends HttpError {
  constructor(message?: string) {
    super(501, message)
  }
}

export class BadGateway extends HttpError {
  constructor(message?: string) {
    super(502, message)
  }
}

export class ServiceUnavailable extends HttpError {
  constructor(message?: string) {
    super(503, message)
  }
}

export class GatewayTimeout extends HttpError {
  constructor(message?: string) {
    super(504, message)
  }
}

export class HTTPVersionNotSupported extends HttpError {
  constructor(message?: string) {
    super(505, message)
  }
}

export class VariantAlsoNegotiates extends HttpError {
  constructor(message?: string) {
    super(506, message)
  }
}

export class InsufficientStorage extends HttpError {
  constructor(message?: string) {
    super(507, message)
  }
}

export class LoopDetected extends HttpError {
  constructor(message?: string) {
    super(508, message)
  }
}

export class BandwidthLimitExceeded extends HttpError {
  constructor(message?: string) {
    super(509, message)
  }
}

export class NotExtended extends HttpError {
  constructor(message?: string) {
    super(510, message)
  }
}

export class NetworkAuthenticationRequired extends HttpError {
  constructor(message?: string) {
    super(511, message)
  }
}

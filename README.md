# Atonal Framework

The most straight-forward Fastify-based web framework

## Usage example

```typescript
import { transform, Type, useAtonal, useRouter } from 'atonal'

const atonal = useAtonal()

const router = useRouter()
const userRouter = useRouter()
const postRouter = useRouter()

postRouter.get('/', {
  schema: {
    params: Type.Object({
      userId: Type.Optional(Type.String({ format: 'integer' })),
    }),
  },
  handler: async req => {
    const { userId } = transform(req.params, { userId: Number })
    return { userId }
  },
})

userRouter.get('/', {
  schema: {
    querystring: Type.Object({
      limit: Type.Optional(Type.String({ format: 'integer' })),
      skip: Type.Optional(Type.String({ format: 'integer' })),
    }),
  },
  handler: async req => {
    const { limit = 20, skip = 0 } = transform(req.query, {
      limit: Number,
      skip: Number,
    })

    return { limit, skip }
  },
})

userRouter.get('/:userId', {
  schema: {
    params: Type.Object({
      userId: Type.String({ format: 'integer' }),
    }),
  },
  handler: async req => {
    const { userId } = transform(req.params, { userId: Number })
    return { userId }
  },
})

userRouter.use('/:userId/posts', postRouter)

router.use('/users', userRouter)
router.use('/posts', postRouter)

atonal.use(router.compile(), { prefix: '/api' })
atonal.listen(3000, '0.0.0.0', err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Hello world!')
  }
})
```

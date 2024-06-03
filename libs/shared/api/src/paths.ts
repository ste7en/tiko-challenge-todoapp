export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type PathType = {
  path: `/${string}`,
  methods: Method[]
}

export const paths: Record<string, PathType> = {
  login: {
    path: '/login/',
    methods: ['POST']
  },
  register: {
    path: '/register/',
    methods: ['POST']
  },
  todos: {
    path: '/todos/',
    methods: ['GET', 'POST']
  },
  todo: {
    path: '/todos/:id',
    methods: ['GET', 'PUT', 'DELETE']
  },
  tokenRefresh: {
    path: '/token/refresh/',
    methods: ['POST']
  },
  tokenVerify: {
    path: '/token/verify/',
    methods: ['POST']
  },
}

type Paths = typeof paths
export type ApiPath = Paths[keyof Paths]

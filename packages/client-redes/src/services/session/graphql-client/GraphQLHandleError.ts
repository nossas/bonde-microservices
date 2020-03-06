import { ApolloLink, Observable } from 'apollo-link'

export const handleErrorMiddleware = errorHandler => {
  return new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      let subscription
      try {
        subscription = forward(operation).subscribe({
          next: result => {
            if (result.errors) {
              errorHandler({
                graphQLErrors: result.errors,
                response: result,
                operation
              })
            }
            observer.next(result)
          },
          error: error => {
            errorHandler({
              operation,
              networkError: error,
              // Network errors can return GraphQL errors on for example a 403
              graphQLErrors: error.result && error.result.errors
            })
          },
          complete: observer.complete.bind(observer)
        })
      } catch (error) {
        errorHandler({ networkError: error, operation })
      }
      return () => {
        if (subscription) subscription.unsubscribe()
      }
    })
  })
}

export class HandleErrorLink extends ApolloLink {

  link: any;

  constructor (errorHandler) {
    super()
    this.link = handleErrorMiddleware(errorHandler)
  }

  request (operation, forward) {
    return this.link.request(operation, forward)
  }
}

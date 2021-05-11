import { handlerPath } from "@libs/handlerResolver";

export default {
    handler: `${handlerPath(__dirname)}/createProduct.main`,
    events: [
      {
        http: {
          method: 'post',
          path: '/products',
          cors: true,
        }
      }
    ]
}

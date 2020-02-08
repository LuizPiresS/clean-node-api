import { Request, Response } from 'express'

import { Controller, HttpRequest } from '../../presentention/protocols'
export const adaptRoute = (constroller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await constroller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json(
        {
          error: httpResponse.body.message
        })
    }
  }
}

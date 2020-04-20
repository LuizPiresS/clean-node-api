import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-constroller-decorator'

export const makeLogControllerDecorator = (constroller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(constroller, logMongoRepository)
}

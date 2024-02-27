import { Body, Controller, Post } from '@nestjs/common'
import { badRequest } from 'shared/helpers'
import { CreateUserUseCase } from '../usecases/create-user.usecase'
import { CreateUserDto } from './dtos/create-use.dto'
@Controller('/user')
export class CreateUserController {
  constructor (private readonly createUser: CreateUserUseCase) {}

  @Post('/')
  async perform (@Body() body: CreateUserDto): Promise<any> {
    const createUserResult = await this.createUser.execute(body)

    if (createUserResult.isLeft()) {
      badRequest(createUserResult.value)
    }
    return createUserResult.value
  }
}

import { SignupAuthRequestDTO } from '@modules/auth/presentation/dto/request/signup.request.dto';
import { CreateUserUseCase } from '@modules/user/application/use-case';
import { CreateUserRequestDTO } from '@modules/user/presentation/dto/request';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SignupAuthUseCase {
    private readonly logger: Logger = new Logger(SignupAuthUseCase.name);

    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    public async execute(request: SignupAuthRequestDTO): Promise<void> {
        this.logger.log(`Signing up user with email: ${request.email}`);
        await this.createUserUseCase.execute(CreateUserRequestDTO.toInstance(request));
        this.logger.log(`User with email: ${request.email} successfully signed up`);
    }
}

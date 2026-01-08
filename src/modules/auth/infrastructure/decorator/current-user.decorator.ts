import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ICurrentUser {
  id: string;
  email: string;
  name: string;
  refreshToken: string | null;
}

const getUserFromContext = (context: ExecutionContext): ICurrentUser => {
  return context.switchToHttp().getRequest()?.user;
};

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  return getUserFromContext(context);
});

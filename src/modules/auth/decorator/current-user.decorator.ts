import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getUserFromContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest()?.user;
};

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  return getUserFromContext(context);
});

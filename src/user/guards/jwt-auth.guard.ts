import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_JWT_AUTH } from '../constants';
import { UserService } from '../user.service';

// import { UserTokenService } from '../../user-token/user-token.service'
// import { STRATEGY_JWT_AUTH } from '../constants/strategy.constant'
// import { AuthService } from '../services/auth.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard(STRATEGY_JWT_AUTH) {
  constructor(
    private userService: UserService, // private userTokenService: UserTokenService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    // Add your custom authentication logic here
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
    //   const decodedData: any = this.userService.decodeToken(
    //     request.headers.authorization.split('Bearer ')[1],
    //   );
    //   console.log(decodedData, '000000000000');
    //   // const latestToken = await this.userTokenService.getActiveUserToken(
    //   //   decodedData?.sub
    //   // )
    //   if (!decodedData) {
    //     throw new UnauthorizedException('jwt is expired.');
    //   }
    }
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleRequest(err, user, info) {
    // console.log(user)
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException(`${info}`);
    }

    return user;
  }
}

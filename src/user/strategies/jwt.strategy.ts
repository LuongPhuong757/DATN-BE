import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
// import { jwtConstants } from '../constants';
import { Injectable } from '@nestjs/common';
// import { AuthService, JWTPayload } from '../auth.service';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    } as StrategyOptions);
  }

  async validate(payload: any) {
    const user = await this.userService.getUserProfile(payload.sub);
    return user;
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'entities/user.entity';
// import { OTP_TYPE } from 'src/user-otp/constants';
// import { UserOtpService } from 'src/user-otp/user-otp.service';
import { SignupDto } from './dto/signup.dto';
import { UserRepository } from './user.repository';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private userOtpService: UserOtpService,
    private jwtService: JwtService,
  ) { }
  async signup(signupDto: SignupDto): Promise<User> {
    const { email, password, userName, address, avatar, phoneNumber } = signupDto;
    const user = await this.findByEmail(signupDto.email);
    if (user) {
      throw new BadRequestException('email_already_exist');
    }
    // await this.userOtpService.verifyOtp({
    //   otp: signupDto.otp,
    //   email: signupDto.email,
    //   otpType: OTP_TYPE.SIGN_UP,
    // });

    if (!user) {
      return this.userRepository.save({
        email: email,
        roles: 'USER',
        password: await hash(password, 10),
        userName,
        address,
        phoneNumber,
        avatar
      });
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || (user && !user.password)) {
      throw new UnauthorizedException('email_does_not_exist');
    }
    const match = await compare(password, user.password);
    if (!match) throw new UnauthorizedException('incorrect_email_password');

    return user;
  }

  async login(user: User) {
    const payload = {
      username: user.userName,
      sub: user.id,
      roles: user.roles,
    };

    const subject = { sub: user.id };
    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
      }),
      accessToken: this.jwtService.sign(
        {
          ...payload,
          ...subject,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC,
        },
      ),
      username: user.userName
    };

    return authToken;
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async getUserProfile(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async getStatisticalUser() {
    const currentDate = moment();
    const currentYear = currentDate.year();
    // const hiringCompany = await UserCompanyEntity.findOne({
    //   where: { userId: user.id }
    // })
    let condition = ''
    // if (!hiringCompany && user.role == Role.HIRING_COMPANY) {
    //   throw new NotFoundException('company_not_found')
    // }
    // if (user.role == Role.HIRING_COMPANY) {
    //   condition = ` and jobs.company_id = ${hiringCompany.id}`
    // }
    let querySelect = '';
    let queryWhere = '';
    let queryGroupBy = '';
    let daysDifference;
    // if (type == TypeStatistical.MONTH) {
    //   const currentMonth = currentDate.month() + 1;
    //   const startOfYear = moment().startOf('year');
    //   const startOfMonth = moment().startOf('month');
    //   daysDifference = startOfMonth.diff(startOfYear, 'week');
    //   querySelect = ',  WEEK(ap.created_at) AS week';
    //   queryWhere = ` and MONTH(ap.created_at) = ${currentMonth}`;
    //   queryGroupBy = `, WEEK(ap.created_at)`;
    // }
    const result = await this.userRepository
      .createQueryBuilder('ap')
      .select(
        `MONTH(ap.created_at) AS month ${querySelect}, COUNT(*) AS amount`,
      )
      // .leftJoin(`ap.job`, `jobs`, `jobs.id = ap.job_id`)
      .where(
        `YEAR(ap.created_at) = :year ${queryWhere} ${condition}`,
        { year: currentYear },
      )
      .groupBy(`MONTH(ap.created_at) ${queryGroupBy}`)
      .getRawMany();

    // if (type == TypeStatistical.MONTH) {
    //   return result.map((item) => {
    //     return { ...item, week: item.week - daysDifference };
    //   });
    // }
    if (result) {
      let length = result.length
      if (result.length < 6) {
        for (let i = 1; i <= 6 - length; i++) {
          result.push({
            "month": result[length - 1].month - i,
            "amount": 0
          })
        }
      } else {
        return result.slice(-6)
      }
      return result;
    } else {
      return []
    }
  }
}

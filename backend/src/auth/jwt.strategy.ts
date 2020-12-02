  import { PassportStrategy } from '@nestjs/passport';
  import { Strategy, ExtractJwt } from 'passport-jwt';
  import { Injectable, UnauthorizedException } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { UserRepository } from '../users/users.repository';
  
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(UserRepository)
      private userRepository: UserRepository,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'd14cc536fea3798e37a5b3d9ee227eee',
      });
    }
  
    async validate(payload: { id: number }) {
      const { id } = payload;
      const user = await this.userRepository.findOne(id, {
        select: ['name', 'email', 'status', 'role', 'id'],
      });
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }
  
      return user;
    }
  }
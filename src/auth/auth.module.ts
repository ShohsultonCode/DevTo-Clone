import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import users from 'src/models/user.schema';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: users }]),
    SharedModule,
    JwtModule.register({
      global: true,
      secret: '$2a$12$ofKffPiGvvVOE21ClTRo1OJPPgA6HpX3/jIHoTPBopb/cIcZ2r9g2',
      signOptions: { expiresIn: '7h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

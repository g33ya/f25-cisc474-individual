import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { PrismaService } from '../prisma/prisma.service';

dotenv.config();

type JwtPayload = {
  sub: string;
  iss: string;
  aud: string | string[];
  scope?: string;
  [key: string]: any; // using namespaced claims (such as email, given_name, family_name)
};

export interface JwtUser {
  userId: string;
  provider: string;
  providerId: string;
  sub: string;
  scopes: string[];
}

function splitSub(sub: string) {
  // "provider|id" → { provider, providerId }
  const [provider, ...rest] = sub.split('|');
  return { provider, providerId: rest.join('|') };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    const { sub, scope } = payload;
    const { provider, providerId } = splitSub(sub);

    const ns = 'https://f25-cisc474-individual-9vy7.onrender.com/';

    const email =
      payload[`${ns}email`] || `${providerId}@${provider}.auth0`;
    const firstName =
      payload[`${ns}given_name`] || (payload.name?.split(' ')[0] ?? 'New');
    const lastName =
      payload[`${ns}family_name`] ||
      (payload.name?.split(' ')[1] ?? 'User');

    let auth = await this.prisma.authentication.findUnique({
      where: {
        provider_providerId: { provider, providerId },
      },
      include: { user: true },
    });


    // If missing, create the user and authentication record
    if (!auth) {
      const user = await this.prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          first_name: firstName,
          last_name: lastName,
          authentications: {
            create: { provider, providerId },
          },
        },
      });

      auth = { user, userId: user.id } as any;
    }

    return {
      userId: auth.userId.toString(),
      provider,
      providerId,
      sub,
      scopes: (scope ?? '').split(' ').filter(Boolean),
    };
  }
}

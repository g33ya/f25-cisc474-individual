import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // makes available everywhere without needing to import
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}

import { Module } from '@nestjs/common';

// Config Import
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        ConfigModule,
    ],
})
export class TopicsModule {}

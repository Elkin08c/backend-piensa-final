import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsDecimal()
  @ApiProperty({ description: 'Oxygen in the blood', example: '98.1' })
  oxygen: number;

  @IsDecimal()
  @ApiProperty({ description: 'Heart Rate of the user', example: '80.1' })
  heartRate: number;

  @IsUUID()
  @ApiProperty({
    description: 'The user id of the event',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}

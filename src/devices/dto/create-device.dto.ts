import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @ApiProperty({ description: 'The name of the device', example: 'Device 1' })
  name: string;

  @IsBoolean()
  @ApiProperty({ description: 'The type of the device', example: 'Type 1' })
  status: boolean;

  @IsUUID()
  @ApiProperty({
    description: 'The user id of the device',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}

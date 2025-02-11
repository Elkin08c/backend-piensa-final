import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateSleepDto {
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria.' })
  @IsDateString(
    {},
    { message: 'La fecha de inicio debe ser un string en formato ISO válido.' },
  )
  startSleep: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha final debe ser un string en formato ISO válido.' },
  )
  endSleep: string;
}

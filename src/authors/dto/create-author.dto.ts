import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly bio: string;
}

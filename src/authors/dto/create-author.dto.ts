import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly bio?: string;
}

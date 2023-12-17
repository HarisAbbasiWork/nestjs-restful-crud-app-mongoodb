import { IsNumber,IsString,IsNotEmpty,MaxLength } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly password: string;

    @IsNumber()
    @IsNotEmpty()
    readonly otp: number;
}
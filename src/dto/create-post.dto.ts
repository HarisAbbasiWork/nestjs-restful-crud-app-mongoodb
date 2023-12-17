import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    // @IsString()
    // @IsNotEmpty()
    // readonly postBy: string;
}
export class UpdatePostDto {
    @IsString()
    @MaxLength(30)
    readonly title: string;

    @IsString()
    readonly description: string;

    // @IsString()
    // @IsNotEmpty()
    // readonly postBy: string;
}
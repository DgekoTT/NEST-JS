import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class AuthUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'почтовый адрес'})
    @IsString({message: " Должно быть строкой"})
    @IsEmail({},{message: 'Некорректный емайл'})
    readonly email: string;
    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsString({message: " Должно быть строкой"})
    @Length(8, 16, {message: "Пароль от 8 до 16 симолов"})
    readonly password: string;
}
/*это простой объект который не содержит логики имеет только поля
которые преднозначены для обмена данными между подсистемами
 */
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'почтовый адрес'})
    @IsString({message: " Должно быть строкой"})
    @IsEmail({},{message: 'Некорректный емайл'})
    readonly email: string;
    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsString({message: " Должно быть строкой"})
    @Length(8, 16, {message: "Пароль от 8 до 16 симолов"})
    readonly password: string;
    @IsString({message: " Должно быть строкой"})
    readonly fullName: string;
    @IsNumber({}, {message: 'Только числа'})
    readonly phone: number;
    @IsNumber({}, {message: 'Только числа'})
    readonly age: number;
    @IsString({message: " Должно быть строкой"})
    readonly city: string;

    userId: number;

}
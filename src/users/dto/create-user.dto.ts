/*это простой объект который не содержит логики имеет только поля
которые преднозначены для обмена данными между подсистемами
 */
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'почтовый адрес'})
    readonly email: string;
    @ApiProperty({example: '12345678', description: 'Пароль'})
    readonly password: string;

    readonly fullName: string;

    readonly phone: number;

    readonly age: number;

    readonly city: string;

    userId: number;

}
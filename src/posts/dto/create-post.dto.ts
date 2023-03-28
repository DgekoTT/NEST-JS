export class CreatePostDto {

    readonly title: string;

    readonly content: string;

    readonly userId: number;// позже сделать вариант из токена получение
}
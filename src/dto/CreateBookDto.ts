import {IsISBN, IsNotEmpty, IsNumber, Length, Max, Min} from "class-validator";
import {Field, InputType} from "type-graphql";

@InputType()
export class CreateBookDto {
    @Field()
    @IsNotEmpty()
    @Length(2, 255)
    title: string;

    @Field()
    @IsNotEmpty()
    @Length(2, 255)
    author: string;

    @Field()
    @IsNotEmpty()
    @IsISBN()
    isbn: string;

    @Field()
    @IsNotEmpty()
    genre: string;

    @Field()
    @IsNumber()
    @Min(1000)
    publicationYear: number;

    @Field()
    @IsNumber()
    @Min(1)
    price: number;

    @Field()
    @IsNumber()
    @Min(0)
    quantityInStock: number;
}

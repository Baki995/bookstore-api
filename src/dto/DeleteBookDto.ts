import { IsISBN } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class DeleteBookDto {
  @Field()
  @IsISBN()
    isbn: string
}

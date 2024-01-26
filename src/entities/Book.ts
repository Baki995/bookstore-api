import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @Field()
    id: string

  @Column()
  @Field()
    title: string

  @Column()
  @Field()
    author: string

  @Column({ unique: true })
  @Field()
    isbn: string

  @Column()
  @Field()
    genre: string

  @Column()
  @Field()
    publicationYear: number

  @Column()
  @Field()
    price: number

  @Column()
  @Field()
    quantityInStock: number
}

@ObjectType()
export class BookPaginated {
  @Field(() => [Book])
    rows: Book[]

  @Field()
    total: number
}

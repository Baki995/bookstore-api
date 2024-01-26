import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Book, BookPaginated } from '@/entities/Book'
import { CreateBookDto } from '@/dto/CreateBookDto'
import { BookService } from '@/services/BookService'
import { DeleteBookDto } from '@/dto/DeleteBookDto'

@Resolver()
export class BookResolver {
  private readonly bookService: BookService

  constructor () {
    this.bookService = new BookService()
  }

  @Query(() => BookPaginated)
  async books (@Arg('page', { defaultValue: 1 }) page: number): Promise<BookPaginated> {
    return await this.bookService.getBooks(page)
  }

  @Mutation(() => Book)
  async addBook (@Arg('book') book: CreateBookDto): Promise<Book | null> {
    return await this.bookService.addBook(book)
  }

  @Mutation(() => Boolean)
  async deleteBook (@Arg('data') { isbn }: DeleteBookDto): Promise<boolean> {
    return await this.bookService.deleteBook(isbn)
  }
}

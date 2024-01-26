import { AppDataSource } from '@/data-source'
import { Book, type BookPaginated } from '@/entities/Book'
import { type Repository } from 'typeorm'
import { type CreateBookDto } from '@/dto/CreateBookDto'

export class BookService {
  private readonly bookRepository: Repository<Book>
  constructor () {
    this.bookRepository = AppDataSource.getRepository(Book)
  }

  async getBooks (page: number): Promise<BookPaginated> {
    const take: number = 2
    const skip: number = (page - 1) * take
    const [rows, total] = await this.bookRepository.findAndCount({ skip, take })
    return {
      rows, total
    }
  }

  async addBook (data: CreateBookDto): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { isbn: data.isbn } })
    if (book != null) {
      await this.bookRepository.update({ isbn: data.isbn }, { quantityInStock: (book.quantityInStock + data.quantityInStock) })
    } else {
      await this.bookRepository.insert(data)
    }

    return await this.bookRepository.findOne({ where: { isbn: data.isbn } })
  }

  async deleteBook (isbn: string): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { isbn } })
    if (book !== null) {
      if (book.quantityInStock) {
        await this.bookRepository.update({ id: book.id }, { quantityInStock: book.quantityInStock - 1 });
        return await this.bookRepository.findOne({ where: { isbn } })
      } else {
        throw new Error('Currently out of stock')
      }
    }
    throw new Error('Book does not exist')
  }
}

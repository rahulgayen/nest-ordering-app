import { Logger, NotFoundException } from '@nestjs/common';
import { Connection, FilterQuery, Model, SaveOptions, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  private logger: Logger;
  constructor(protected readonly model: Model<TDocument>, private readonly connection: Connection) {}
  async create(document: Omit<TDocument, '_id'>, options?: SaveOptions): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
  }
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.error('Document not found with filterquery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }
  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, updateData: Partial<TDocument>): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, updateData, { lean: true, new: true });

    if (!document) {
      this.logger.error('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }
  async upsert(filterQuery: FilterQuery<TDocument>, updateData: Partial<TDocument>): Promise<TDocument> {
    return this.model.findOneAndUpdate(filterQuery, updateData, {
      lean: true,
      upsert: true,
      new: true,
    });
  }
  async find(filterQuery?: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery, {}, { lean: true });
  }
  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}

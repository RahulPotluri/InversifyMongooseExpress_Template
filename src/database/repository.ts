import db from 'database';
import { injectable, unmanaged } from 'inversify';
import { FilterQuery, Model, model, Types } from 'mongoose';

/**
 * Fields you want to select. For mongodb it is a key-value pair.
 * Key is the name of the field and Value is 0 (exclude) or 1 (include).
 * Example: { username: 1, email: 1 } (Select only username and email)
 */
 export interface Select {
  [key: string]: 1 | 0;
}

/**
 * Fields you want to order by. For mongodb it is a key-value pair.
 * Key is the name of the field and Value is 1 (ascending) or -1 (descending).
 * Example: { username: 1 } (Sort result by username in ascending order)
 */
export interface Sort {
  [key: string]: 1 | -1;
}

/**
 * Base repository interface.
 */
export interface IRepository<T> {
  /**
   * Receives an ID and fetch data from database by that ID.
   *
   * @param id Id of the document
   * @param select Field to project properties. This is optional.
   */
  get(id: Types.ObjectId, select?: Select): Promise<T>;

  /**
   * Get documents from collection.
   *
   * @param filter Filter query
   * @param limit Documetn limit per page
   * @param page Current page number
   * @param [select] Fields to select
   * @param [sort] Sort order
   *
   * @returns Array of documents
   */
  find(filter: FilterQuery<T>, limit: number, page?: number, select?: Select, sort?: Sort): Promise<T[]>;

  /**
   * Insert one item in the collection.
   *
   * @param data Object that you want to store
   */
  create(data: Partial<T>): Promise<T>;
  createMany(data: Partial<T[]>): Promise<T[]>;

  update(filter: FilterQuery<T>, data: Partial<T>, multi: boolean): Promise<void>;
  updateById(ids: Types.ObjectId | Types.ObjectId[], data: Partial<T>): Promise<void>;

  /**
   * It finds all the matching documents by the given filter and removes them.
   *
   * @param filter FilterQuery
   */
  remove(filter: FilterQuery<T>, multi: boolean): Promise<void>;

  /**
   * Remove documents from database by given IDs. This method receives one or more
   * IDs. Checks if the IDs are valid and proceed to delete.
   *
   * @param ids Types.ObjectId | Types.ObjectId[]
   */
  removeById(id: Types.ObjectId | Types.ObjectId[]): Promise<void>;

  /**
   * Get the collection instance of the repository.
   *
   * @returns MongoDB collection instance
   */
  getCollection(): Model<T>;
}

/**
 * This Repository class is the base repository. It is an abstract class because it can only be
 * extended. This class is writen to support mongoose properly which means it will look different
 * if you use mongodb driver directly or use any other orm or database driver.
 *
 * The collection property is the mongoose collection in this case. For you, it can be mongodb collection for example.
 */
 @injectable()
 export default class Repository<T> implements IRepository<T> {
 
   private readonly _model: Model<T>;
 
   constructor(@unmanaged() model: Model<T>) {
      this._model = model;
   }
 
   public async get(id: Types.ObjectId, select: Select = {}): Promise<T> {
     const objectId = this.getValidObjectId(id);
 
     const collection = this._model;
 
     const doc: T = await collection.findById({ _id: objectId }, select);
 
     return doc;
   }
 
   public async find(filter: FilterQuery<Partial<T>> = {}, limit: number = 10, page: number = 0, select?: Select, sort?: Sort): Promise<T[]> {
     const collection = this._model;
     const query = collection.find(filter, select);
 
     if (sort) {
       query.sort(sort);
     }
 
     if (page > 0) {
       const skip = limit * (page - 1);
       query.skip(skip);
     }
 
     query.limit(limit);
 
     const docs = await query.then();
 
     return docs;
   }
 
   public async create(data: Partial<T>): Promise<T> {
     if (!data) {
       throw new Error('Empty object provided');
     }
 
     const collection = this._model;
     const doc = (await collection.create(data)) as T;
 
     return doc;
   }
 
   public createMany(_data: Partial<T[]>): Promise<T[]> {
     throw new Error('Method not implemented.');
   }
 
   public async update(_filter: FilterQuery<T>, _data: Partial<T>, _multi: boolean): Promise<void> {
     throw new Error('Method not implemented.');
   }
 
   public async updateById(ids: Types.ObjectId | Types.ObjectId[], data: Partial<T>) {
     let objectIds = [];
 
     if (Array.isArray(ids)) {
       objectIds = ids.map((id) => this.getValidObjectId(id));
     } else {
       objectIds = [this.getValidObjectId(ids as Types.ObjectId)];
     }
 
     const collection = this._model;
     await collection.updateMany({ _id: { $in: objectIds } });
   }
 
   public async remove(filter: FilterQuery<T>, multi: boolean): Promise<void> {
     const collection = this._model;
     if (multi) {
       await collection.deleteMany(filter);
     } else {
       await collection.deleteOne(filter);
     }
   }
 
   public async removeById(ids: Types.ObjectId | Types.ObjectId[]): Promise<void> {
     let objectIds = [];
 
     if (Array.isArray(ids)) {
       objectIds = ids.map((id) => this.getValidObjectId(id));
     } else {
       objectIds = [this.getValidObjectId(ids as Types.ObjectId)];
     }
 
     const collection = this._model;
     await collection.deleteMany({ _id: { $in: objectIds } });
   }
 
   public getCollection(): Model<T> {
     return this._model;
   }

  getValidObjectId(id: string | Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) {
      console.log("Mongo DB error");
    }
  
    if (typeof id === 'string') {
      id = new Types.ObjectId(id);
    }
  
    return id;
  }
 }
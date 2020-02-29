
export declare class JsonbDb {
  /**
   * Query readable json from collection
   * @return Array of any fetched items
   */
  private query: any[];
  constructor(configs: { db: string });
  /**
   * get available collection
   * @return List of collections
   */
  collections(): string[];
  /**
  * create collection in a database
   @param  collectionName @description name of collection to be created
   @param  data @description data to be inserted when collection created
 * @return responseMessage
 */
  createCollection(collectionName: string, data?: any): { status: Boolean, message: string }

  /**
   * update collection in a database
   *@param  oldcollectionName @description name of old collection to be renamed
    @param  newcollectionName  @description name of new collection
  * @return  responseMessage
  */
  updateCollection(oldCollectionName: string, newCollectionName: string): { status: Boolean, message: string }

  /**
   * delete collection from database
  * @param collectionName @description name of collection to be deleted
  * @return  responseMessage
  */
  dropCollection(collectionName: string): { status: Boolean, message: string }
  /**
  * Find,update,remove items innside a collection
  * @return any
  */
  collection(collectionName: string): {
    /**
     * Find items inside a collection
     * @param criteria @description searching criteria,when not provided all items are fetched
     * @return Array of avalable items
     */
    find(criteria?: Object): {
      /**
       * Skip the number of rows for provided output
       * @param rows @description number of rows to be skipped
       */
      skip(rows: number): this;
      /**
       * Limit the number of rows to be fetched
       * @param rows @description number of rows to be returned
       */
      take(rows: number): this;
      /**
       * Format json response into nice look
       * @return Array of fetched itmes
       */
      pretty(): any;
      /**
       * Format json response into a table
       * @return draw table
       */
      table(): any;

      /**convert response to object
       *@return object
       */
      toObject(): object;
      /**Provided Total number of rows of can be fetched for provided search criteria in find function
       * @return Total rows
       */
      count(): number;


    }

    /**
        * update  items inside a collection
        * @param criteria @description searching parameters
        * @param value   @description object  to be updated
        * @return Array of updated items
        */
    update(criteria: object, value: object): any[];

    /**
      * delete  items inside a collection
      * @param  criteria @description searching parameters
      * @param value @description object to be removed
      * @return  Array of removed items
      */
    remove(criteria): any[];
    /**
         * insert single object (item) into a collection,
         * new collection will be created if collection name provieded not exist
         * @param value @description object to be inserted
         * @return insertedId
         */
    insert(value: object): { insertedId: string };
    /**
     * insert multiple object into a collection
     * new collection will be created if collection name provieded not exist
     * @param values @description List of object to be inserted
     * @return List of insertedIds
     */
    insertMany(values: Object[]): { insertedId: string }[];

  }
}



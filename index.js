const Db = require("./lib/json-db");

class JsonbDb {

    constructor() { }
    /**
     * @return {string[]} arrays of collections name
     */
    collections() {
        return Db.collections();
    }

    /**
     * create collection in a database
      @param {String} collectionName
      @param {Object} data
    * @return {{status:Boolean,message:string}} responseMessage
    */
    createCollection(collectionName, data) {
        return Db.createCollection(collectionName, data);

    }

    /**
     * update collection in a database
     *@param {String} oldcollectionName
      @param {String} oldcollectionName
    * @return {{status:Boolean,message:string}} responseMessage
    */
    updateCollection(oldCollectionName, newCollectionName) {
        return Db.updateCollection(oldCollectionName, newCollectionName);
    }

    /**
     * delete collection from database
   * @param {String} collectionName
  * @return {{status:Boolean,message:string}} responseMessage
  */
    dropCollection(collectionName) {
        return Db.dropCollection(collectionName);
    }
    /**
    * manipulate data stored in collections
    * @param { String } collection
     */

    collection(collection) {
        if (!collection) throw new Error("CollectionName required");
        return {
            find: (criteria) => (new class {
                constructor() {
                    this.query = Db.collection(collection).find(criteria);
                    return this;
                }
                /**
                 * limit number of output for exeuted query
                 * @param {Number} takerow 
                 */
                take(takerow) {
                    try {
                        this.query.length = takerow;
                    } catch (e) {

                    }
                    return this;
                }
                /**
                 * skip rows when retriving data from db
                 * @param {Number} skiprow 
                 */
                skip(skiprow) {
                    try {
                        this.query = this.query.slice(skiprow);
                    } catch (e) {

                    }

                    return this;
                }
                /**convert array to object
                 *@return { Object }  object
                 */
                toObject() {
                    return Object.assign({}, this.query)
                }
                /**
                 * format output into pretty readable json fomart  */
                pretty() {
                    return JSON.stringify(this.query, null, 4);
                }
                ;
                /**
                 * format  output into tabular form  */
                table() {
                    console.table(this.query);
                    return this.query.length + " rows  fetched";
                }

                /**
                * count total number of rows for provided query
                * @return {Number} number
                */
                count() {
                    if (Array.isArray(this.query)) {
                        return this.query.length;
                    }

                    return 0;

                }
            }),

            /**
             * insert single object into a databse
             * @param {Object} value
             * @return insertedIds
             */
            insert: (value) => Db.collection(collection).insert(value),
            /**
             * insert multiple object into a database
             * @param { Array } values
             */
            insertMany: (values) => Db.collection(collection).insertMany(values),
            /**
             * update  items into a databse
             * @param {Object} Object
             * @param {Object} value
             */
            update: (criteria, value) => Db.collection(collection).update(criteria, value),
            /**
            * remove  items from a databse
            * @param {Object} criteria
            * @param {Object} value
            * @return  removed items
            */
            remove: (criteria) => Db.collection(collection).remove(criteria),
        }
    }

}

module.exports = { JsonbDb };
const jsonDb = require("./lib/json-db");

class Database {

    constructor() { }
    /**
     * @return {string[]} arrays of collections name
     */
    collections() {
        return jsonDb.collections();
    }

    /**
     * create collection in a database
     * @param {String} collectionName
     * @param {Object} data
    * @return {{status:Boolean,message:string}} responseMessage
    */
    createCollection(collectionName, data) {
        return jsonDb.createCollection(collectionName, data);

    }

    /**
     * update collection in a database
     * @param {String} oldcollectionName
     *  @param {String} oldcollectionName
    * @return {{status:Boolean,message:string}} responseMessage
    */
    updateCollection(oldCollectionName, newCollectionName) {
        return jsonDb.updateCollection(oldCollectionName, newCollectionName);
    }

    /**
     * delete collection from database
   * @param {String} collectionName
  * @return {{status:Boolean,message:string}} responseMessage
  */
    dropCollection(collectionName) {
        return jsonDb.dropCollection(collectionName);
    }
    /**
    * manipulate data stored in collections
  * @param {String} collection
 */

    collection(collection) {
        return {
            find: (criteria) => (new class {
                constructor() {
                    this.query = jsonDb.collection(collection).find(criteria);
                    return this;
                }
                /**
                 * limit number of output for exeuted query
                 * @param {Number} takerow 
                 */
                take(takerow) {
                    this.query.length = takerow;
                    return this;
                }
                /**
                 * skip rows when retriving data from db
                 * @param {Number} skiprow 
                 */
                skip(skiprow) {
                    this.query = this.query.slice(skiprow);
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
                    console.table(JSON.stringify(this.query, null, 4));
                    return this.query.length + " rows  fetched";
                }
                ;
                /**
                 * format  output into tabular form  */
                table() {
                    console.table(this.query);
                    return this.query.length + " rows  fetched";
                }
            }),
            /**
             * count total number of rows for provided query
             * @return {Number} number
             */
            count: () => jsonDb.collection(collection).find({}).length,
            /**
             * insert single object into a databse
             * @param {Object} value
             * @return {any[]} insertedIds
             */
            insert: (value) => jsonDb.collection(collection).insert(value),
            /**
             * insert multiple object into a database
             * @param { [Object]} values
             * @return {any[]} insertedIds
             */
            insertMany: (values) => jsonDb.collection(collection).insertMany(values),
            /**
             * update  items into a databse
             * @param {Object} Object
             * @param {Object} value
             * @return {any[]} udateditems
             */
            update: (criteria, value) => jsonDb.collection(collection).update(criteria, value),
            /**
            * remove  items from a databse
            * @param {Object} criteria
            * @param {Object} value
            * @return {any[]} removed items
            */
            remove: (criteria) => jsonDb.collection(collection).remove(criteria),
        }
    }

}

module.exports = new Database();
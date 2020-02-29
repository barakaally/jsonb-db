const Db = require("./lib/json-db");

class JsonbDb extends Db {

    constructor(configs = { db }) {
        super(configs)

    }
    /**
    * @return {string[]} arrays of collections name
    */
    collections() {

        return this.dbCollections();
    }

    /**
     * create collection in a database
      @param {String} collectionName
      @param {Object} data
    * @return {{status:Boolean,message:string}} responseMessage
    */
    createCollection(collectionName, data) {
        return this.dbCreateCollection(collectionName, data);

    }

    /**
     * update collection in a database
     *@param {String} oldcollectionName
      @param {String} oldcollectionName
    * @return {{status:Boolean,message:string}} responseMessage
    */
    updateCollection(oldCollectionName, newCollectionName) {
        return this.dbUpdateCollection(oldCollectionName, newCollectionName);
    }

    /**
     * delete collection from database
   * @param {String} collectionName
  * @return {{status:Boolean,message:string}} responseMessage
  */
    dropCollection(collectionName) {
        return this.dbDropCollection(collectionName);
    }
    /**
    * manipulate data stored in collections
    * @param { String } collection
     */

    collection(collection) {

        if (!collection) throw new Error("CollectionName required");
        return {
            find: (criteria) => new class {

                /**
                 *@param { JsonbDb } base 
                 */
                constructor(base) {
                    this.query = [];
                    let dbQuery = base.dbCollection(collection).find(criteria);
                    if (dbQuery != null) {
                        this.query = dbQuery;
                    }

                    return this;
                }
                /**
                * limit number of output for exeuted query
                * @param {Number} rows
                 */
                take(rows) {
                    if (typeof rows != 'number') throw new Error("input row paramater must be a number");

                    try {
                        this.query.length = rows;
                    } catch (e) {

                    }

                    return this;
                }
                /**
                * skip rows when retriving data from db
                * @param {Number} rows 
                */
                skip(rows) {

                    if (typeof rows != 'number') throw new Error("input row paramater must be a number");

                    try {
                        this.query = this.query.slice(rows);
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

                /**
                 * format  output into tabular form  
                 * 
                 * */
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



            }(this),

            /**
             * insert single object into a databse
             * @param {Object} value
             * @return insertedIds
             */
            insert: (value) => this.dbCollection(collection).insert(value),
            /**
             * insert multiple object into a database
             * @param { Array } values
             */
            insertMany: (values) => this.dbCollection(collection).insertMany(values),
            /**
             * update  items into a databse
             * @param {Object} Object
             * @param {Object} value
             */
            update: (criteria, value) => this.dbCollection(collection).update(criteria, value),
            /**
            * remove  items from a databse
            * @param {Object} criteria
            * @param {Object} value
            * @return  removed items
            */
            remove: (criteria) => this.dbCollection(collection).remove(criteria),
        }
    }

}

module.exports = { JsonbDb };
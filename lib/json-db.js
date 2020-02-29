const fs = require("fs");
const path = require("path");
const status = require("../status/status");
class Db {

    constructor(configs = { db }) {

        this.config = configs;

        if (!fs.existsSync(`./jsonbdb/${configs.db}`)) {

            if (!fs.existsSync(`./jsonbdb/`)) fs.mkdirSync(`./jsonbdb/`);

            fs.mkdir(`./jsonbdb/${configs.db}`, (err) => {
                if (err) throw err;
            });

        }

    }


    isCollectionExist(collection) {

        return fs.existsSync(`${collection}` == 'sample' ?
            `${path.join(__dirname, `../data/${collection}.json`)}` :
            `./jsonbdb/${this.config.db}/${collection}.json`);
    }

    dbCreateCollection(collection, data = null) {

        if (!collection) throw new Error("Collection name required");

        if (!this.isCollectionExist(collection)) {
            fs.writeFileSync(`./jsonbdb/${this.config.db}/${collection}.json`,
                JSON.stringify(this.getDataWithId(Array.isArray(data) ? data : data != null ? [data] : []), null, "\t"),
                { encoding: "utf8" });

            if (typeof data == 'object' && data != null) {
                return this.findItemInCollection(collection, data).map((x) => {
                    return {
                        insertedId: {
                            _id: x._id
                        }
                    }
                }
                )[0];
            }

            return status.message(
                true,
                `collection ${collection}  created`
            );

        }

        return status.message(
            false,
            `collection ${collection}  already existed`
        );
    }

    dbDropCollection(collection) {
        if (!collection) throw new Error("Collection name required");

        if (this.isCollectionExist(collection)) {
            fs.unlink(`${collection}` == 'sample' ?
                `${path.join(__dirname, `../data/${collection}.json`)}` :
                `./jsonbdb/${this.config.db}/${collection}.json`, (err) => {
                    if (err) throw err;
                });

            return status.message(
                true,
                `collection ${collection}  has been deleted`
            );
        }
    }

    dbCollection(collection) {
        return {
            find: (criteria) => this.findItemInCollection(collection, criteria),
            insert: (value) => this.insertItemInCollection(collection, value),
            insertMany: (values) => this.insertItemsInCollection(collection, values),
            update: (criteria, valueToUpdate) => this.updateItemInCollection(collection, criteria, valueToUpdate),
            remove: (criteria) => this.removeItemInCollection(collection, criteria)
        }
    }

    dbUpdateCollection(oldCollectionName, newCollectionName) {
        if (!oldCollection) throw new Error("oldCollection name required");
        if (!newCollection) throw new Error("newCollection name required");

        try {

            fs.rename(
                `${oldCollection}` == 'sample' ?
                    `${path.join(__dirname, `../data/${oldCollection}.json`)}` :
                    `./jsonbdb/${this.config.db}/ ${oldCollection}.json`,
                `${collection}` == 'sample' ?
                    `${path.join(__dirname, `../data/${newCollection}.json`)}` :
                    `./jsonbdb/${this.config.db}/ ${newollection}.json`, (err) => {
                        if (err) throw err;
                    }
            );

            return {
                status: true,
                message: `Collection ${oldCollectionName} renamed to ${newCollectionName} `
            }
        } catch (e) {
            return {
                status: false,
                message: `Failed to rename ${oldCollectionName} ,double check collection name or collection in use`
            }
        }

    }


    dbCollections() {

        const systemCollections = fs.readdirSync(path.join(__dirname, `../data/`), { encoding: "utf8" })
            .map(x => {
                return x.replace(".json", '')
            });

        const definedCollections = fs.readdirSync(`./jsonbdb/${this.config.db}/`, { encoding: 'utf-8' }).map(x => {
            return x.replace(".json", '');
        });

        return [...definedCollections, ...systemCollections].sort();
    }

    guID() {
        return ('xxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString();
        }))
    }

    getDataWithId(data) {
        let dataToStore = [];
        if (Array.isArray(data)) {
            data.forEach(element => {
                dataToStore.push(
                    {
                        _id: this.guID(),
                        ...element
                    }
                );
            });

            return dataToStore;
        }


        return {
            _id: this.guID(),
            ...data
        }
    }

    findItemInCollection(collection, criteria) {

        if (this.isCollectionExist(collection)) {
            let datas = [];
            datas = JSON.parse(fs.readFileSync(
                `${collection}` == 'sample' ?
                    `${path.join(__dirname, `../data/${collection}.json`)}` :
                    `./jsonbdb/${this.config.db}/${collection}.json`, { encoding: "utf8" }
            ));

            const res = datas.filter(x => {
                if (!criteria) {
                    return true;
                }
                return Object.keys(criteria).every(key => {
                    return x[key] == criteria[key];

                })
            });

            return res;

        } else {
            //correction name not existed
        }
    }
    /**
     * 
     * @param {String} collection 
     * @param {Object} value 
     */
    insertItemInCollection(collection, value) {
        if (!collection) throw new Error("collection name required");

        if (typeof value == 'object' && typeof value !== 'undefined' && value !== null) {
            if (this.isCollectionExist(collection)) {

                const datas = JSON.parse(fs.readFileSync(
                    `${collection}` == 'sample' ?
                        `${path.join(__dirname, `../data/${collection}.json`)}` :
                        `./jsonbdb/${this.config.db}/${collection}.json`), { encoding: "utf8" });
                if (value._id) {

                    value._id = this.guID();
                }

                datas.push(this.getDataWithId(value));


                fs.writeFileSync(
                    `${collection}` == 'sample' ?
                        `${path.join(__dirname, `../data/${collection}.json`)}` :
                        `./jsonbdb/${this.config.db}/${collection}.json`, JSON.stringify(datas, null, "\t"), { encoding: "utf8" });

                return this.findItemInCollection(collection, value).map((x) => {
                    return {
                        insertedId: {
                            _id: x._id
                        }
                    }
                }
                )[0];

            } else {
                return this.dbCreateCollection(collection, value);
            }
        }

        if (Array.isArray(value)) {
            return {
                status: false,
                message: "[*] To insert arrays of object or multiple value use insertMany instead"
            }

        }

        if (typeof value == 'undefined' || value == null || typeof value == 'string' || typeof value == 'function' || typeof value == 'number' || typeof value == 'boolean' || typeof value == 'symbol') {

            return {
                status: false,
                message: `[*] Rejected ${typeof value} value, use object instead, read more about javascript object here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects`
            }
        }


    }

    insertItemsInCollection(collection, values) {
        if (!collection) throw new Error("collection name required");

        if (Array.isArray(values)) {
            const insertValues = this.getDataWithId(values);
            insertValues.forEach(value => {
                if (value._id) {

                    value._id = this.guID();
                }
            });

            let insertedItems = [];
            if (this.isCollectionExist(collection)) {
                const datas = JSON.parse(fs.readFileSync(
                    `${collection}` == 'sample' ?
                        `${path.join(__dirname, `../data/${collection}.json`)}` :
                        `./jsonbdb/${this.config.db}/${collection}.json`, { encoding: "utf8" }));
                datas.push(...insertValues);

                fs.writeFileSync(
                    `${collection}` == 'sample' ?
                        `${path.join(__dirname, `../data/${collection}.json`)}` :
                        `./jsonbdb/${this.config.db}/${collection}.json`, JSON.stringify(datas, null, "\t"), { encoding: "utf8" });

                insertedItems.push(insertValues.map((x) => {
                    return {
                        insertedId: {
                            _id: x._id
                        }
                    }
                }
                ));
            } else {

                return this.dbCreateCollection(collection, values);
            }

            return insertedItems[0];

        } else {

            return {
                status: false,
                message: " [*] To insert object or single item use insert instead"
            }
        }
    }

    updateItemInCollection(collection, criteria, valueToUpdate) {
        if (!collection) throw new Error("collection name required");
        let newData = [];
        let allData = [];
        newData = this.findItemInCollection(collection, criteria).map(data => {

            Object.keys(valueToUpdate).every(key => {
                data[key] = valueToUpdate[key];
            });

            return data;
        });


        allData = this.findItemInCollection(collection, {});

        let newupdates = allData.map(data => {
            newData.forEach(x => {
                if (data._id == x._id) {
                    data = x;
                }
            })
            return data;
        });


        fs.writeFileSync(
            `${collection}` == 'sample' ?
                `${path.join(__dirname, `../data/${collection}.json`)}` :
                `./jsonbdb/${this.config.db}/${collection}.json`, JSON.stringify(newupdates, null, "\t"), { encoding: "utf8" });

        return { updatedItems: this.findItemInCollection(collection, valueToUpdate) };
    }

    removeItemInCollection(collection, criteria) {
        if (!collection) throw new Error("collection name required");

        let removableData = this.findItemInCollection(collection, criteria);


        let allData = this.findItemInCollection(collection, {});

        let newupdates = allData.filter(x => {
            return removableData.map(x => x._id).indexOf(x._id) == -1;

        });

        fs.writeFileSync(
            `${collection}` == 'sample' ?
                `${path.join(__dirname, `../data/${collection}.json`)}` :
                `./jsonbdb/${this.config.db}/${collection}.json`, JSON.stringify(newupdates, null, "\t"), { encoding: "utf8" });

        return { removedItems: removableData };
    }

}

module.exports = Db;
export default new class Database {
    constructor() { }

    collections(): string[]

    createCollection(collection: string, data?: Object): { status: boolean, message: string }

    updateCollection(oldCollectionName: string, newCollectionName: string): { status: boolean, message: string }

    dropCollection(collectionName: string): { status: boolean, message: string }

    collection(collectionName: string): {
        find(criteria): {
            take(takerow: number): this
            skip(skiprow: number): this
            pretty(): void
            table(): void,
            toObject(): Object
        },
        insert(value: Object): {
            insertedId: { _id: string }
        },

        insertMany(values: [Object]): [{ insertedId: { _id: string } }]

        update(criteria: Object, values: any): any[]

        remove(criteria: Object): any[]

    }
}

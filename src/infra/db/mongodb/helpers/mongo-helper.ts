import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  // Inicializa e seta a variavel com o tipo MongoClient
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...accountWithoutId } = collection
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}

import mongodb from 'mongodb';
const { MongoClient } = mongodb;

const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://admin:admin@localhost:27017';

async function setMongoDb() {
  const client = await MongoClient.connect(connectionString, function (err, client) {
    if (err) {
      console.error('MongoDB connection error:', err);
    }
    else {
      console.log('MongoDB connected successfully');
    }
  })

  process.on('beforeExit', (_) => {
    client.close().then(() => {
      console.log('MongoDB connection closed');
    })
  })
  const db = client.db('element_store')
  await checkMongoCollections(db)
  return db
}

async function checkMongoCollections(db) {
  try {
    await db.createCollection('users');
    console.log('Collection "users" created');
  } catch (error) { }
  try {
    await db.createCollection('elements');
    console.log('Collection "elements" created');
  } catch (error) { }
}

const db = await setMongoDb()
const userCollection = db.collection('users')
const elementCollection = db.collection('elements')


export { userCollection, elementCollection };

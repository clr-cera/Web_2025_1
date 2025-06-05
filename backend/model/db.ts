import mongoose from 'mongoose';

const connectionString: string = process.env.MONGO_CONNECTION_STRING || 'mongodb://admin:admin@localhost:27017';

mongoose.connect(connectionString)

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  email: String,
  password: String,
  role: String,

})
const User = mongoose.model('User', UserSchema);

const ElementSchema = new mongoose.Schema({
  atomic_number: Number,
  atomic_mass: Number,
  symbol: String,
  name: String,
  description: String,
  category: String, // Ex: "Metals", "Non-Metals", "Noble Gases"
  state: String, // Ex: "Solid", "Gas"
  price: Number,
  stock: Number,
  row: Number, // Posição na tabela periódica (linha)
  column: Number, // Posição na tabela periódica (coluna)
  image_url: String, // Link para a imagem do elemento
})

const Element = mongoose.model('Element', ElementSchema);




export { User, Element };

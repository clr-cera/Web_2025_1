import mongoose from 'mongoose';
import { HashPassword } from '../repository/hash.ts';

const connectionString: string = process.env.MONGO_CONNECTION_STRING || 'mongodb://admin:admin@localhost:27017';

mongoose.connect(connectionString)

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  }
})
const User = mongoose.model('User', UserSchema);
try {
  await User.create({
    email: 'admin@admin.com.br',
    name: 'admin',
    password: HashPassword('admin'),
    role: 'Super Admin'
  })

  console.log('Super Admin user created successfully');
} catch (error) {

}

const ElementSchema = new mongoose.Schema({
  atomic_number: Number,
  atomic_mass: Number,
  symbol: String,
  name: String,
  description: String,
  category: String, // Ex: "Metals", "Non-Metals", "Noble Gases"
  state: String, // Ex: "Solid", "Gas"
  price: Number,
  stock: {
    type: Number,
    min: 0,
    required: true,
  },
  row: Number, // Posição na tabela periódica (linha)
  column: Number, // Posição na tabela periódica (coluna)
  image_url: String, // Link para a imagem do elemento
})

const Element = mongoose.model('Element', ElementSchema);




export { User, Element };

import mongoose from 'mongoose';
import { HashPassword } from '../repository/hash.ts';

// If MONGO_CONNECTION_STRING is defined, use it; otherwise, default to our MongoDB Atlas Cluster
const connectionString: string = process.env.MONGO_CONNECTION_STRING || 'mongodb+srv://admin:admin@elementstore.8njphnl.mongodb.net/?retryWrites=true&w=majority&appName=elementStore';

mongoose.connect(connectionString)

// Defines User Schema
// Primary key: email
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
}, { strict: true });
const User = mongoose.model('User', UserSchema);

// Create a Super Admin user if it does not exist
try {
  await User.create({
    email: 'admin@admin.com.br',
    name: 'admin',
    password: HashPassword('admin'),
    role: 'Super Admin'
  })

  console.log('Super Admin user created successfully');
} catch (error) { }

// Defines Element Schema
// Primary key: name
const ElementSchema = new mongoose.Schema({
  atomic_number: {
    type: Number,
    required: true,
    unique: true,
  },
  atomic_mass: {
    type: Number,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['Metals', 'Non-Metals', 'Noble Gases'],
    required: true,
  },
  state: {
    type: String,
    enum: ['Solid', 'Liquid', 'Gas'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  }, // Posição na tabela periódica (linha)
  column: {
    type: Number,
    required: true,
  }, // Posição na tabela periódica (coluna)
  image_url: String, // Link para a imagem do elemento
}, { strict: true });

// Create a unique index on row and column to ensure no duplicate elements in the same position
ElementSchema.index({ row: 1, column: 1 }, { unique: true });

const Element = mongoose.model('Element', ElementSchema);

export { User, Element };

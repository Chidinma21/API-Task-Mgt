import mongoose from 'mongoose';
import { Config } from '../types';

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

export default {
  connect: async (config: Config) => {
    const mongoURI = config.mongoUri!;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return mongoose.connection;
  }
};

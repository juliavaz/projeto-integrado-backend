import { connect } from 'mongoose';

export default connect(
  `mongodb://localhost:27017/${process.env.DATABASE_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
).then(() => console.log('Conectado no banco de dados.'));

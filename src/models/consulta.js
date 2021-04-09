import { model, Schema } from 'mongoose';

export default model(
  'consulta',

  new Schema(
    {
      nome: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);

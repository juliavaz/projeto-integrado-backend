import { model, Schema } from 'mongoose';

export default model(
  'atendente',

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

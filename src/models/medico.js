import { model, Schema } from 'mongoose';

export default model(
  'medico',

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

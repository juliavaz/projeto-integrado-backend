import { model, Schema } from 'mongoose';

export default model(
  'especialidade',

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

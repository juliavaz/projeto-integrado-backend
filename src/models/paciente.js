import { model, Schema } from 'mongoose';

export default model(
  'paciente',

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

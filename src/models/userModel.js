const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is a required field.'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is a required field.'],
      minlength: [5, 'Passwords must have at least 5 characters.'],
      // Do not select/show user passwords by default
      select: false,
    },
    role: {
      type: String,
      enum: ['paciente', 'atendente', 'admin', 'medico', 'chefeDpt'],
      default: 'paciente',
    },
    activationToken: {
      type: String,
    },
    activated: {
      type: Boolean,
      // Como usuarios serao criados por administradores ou atendentes, colocar a conta como ativada por padrao.
      // Caso o usuario pudesse se cadastrar sozinho (pela internet, por ex.), exigir ativacao por email
      default: true,
    },
    deleted: {
      type: Boolean,
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    details: {
      dateOfBirth: Date,
      crm: Number,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Model Methods
userSchema.methods.checkPassword = async function (passwordInput, userPassword) {
  return await bcrypt.compare(passwordInput, userPassword);
};

userSchema.methods.passwordChangedAfter = function (timestamp) {
  // Returns true if password has been changed after the provided timestamp
  return parseInt(new Date(this.passwordUpdatedAt).getTime() / 1000) > timestamp;
};

userSchema.methods.createActivationToken = async function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.activationToken = crypto.createHash('sha256').update(token).digest('hex');

  this.save({ validateBeforeSave: false });

  return token;
};

userSchema.methods.createPasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

  this.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000;

  this.save({ validateBeforeSave: false });

  return token;
};

// Middlewares
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordUpdatedAt = Date.now();
  }

  return next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});

// Static Methods
userSchema.statics.getModelName = (type = 'singular') => {
  return type === 'plural' ? 'users' : 'user';
};

const User = mongoose.model('User', userSchema);

module.exports = User;

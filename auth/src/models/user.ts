import { Document, Model, model, Schema } from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that
// a User Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  // Only run if password is modified else ignore
  // (isModfied is true pre first save too)
  if (this.isModified('password')) {
    // this.get('password') gets users password off the document
    const hashed = await Password.toHash(this.get('password'));
    // Update the password
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };

// OR
/*
interface UserAttrs {
  email: string;
  password: string
}

type UserDoc = Document & UserAttrs

const userSchema = new Schema<UserDoc>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const UserModel = model<UserDoc>('User', userSchema)

export class User extends UserModel {
  constructor(attrs: UserAttrs) {
    super(attrs)
  }
}*/

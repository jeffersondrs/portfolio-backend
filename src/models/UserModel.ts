import mongoose, { Schema } from "mongoose";
import {
  User,
  SocialMedia,
  UserOthersInfos,
  UserDocument,
} from "../types/global";
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userOthers: { type: Schema.Types.ObjectId, ref: "UserOthers" },
  },

  { timestamps: true }
);

const UserOthersSchema: Schema = new Schema<UserOthersInfos>(
  {
    job: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, required: true },
    social: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

UserOthersSchema.pre("save", function (next) {
  this.social = this.social.filter((social: SocialMedia) => {
    return social.name && social.url;
  });

  next();
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(this.password, salt);

      this.password = hashedPassword;
    } catch (err) {
      console.log(err);
    }
  }

  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    return false;
  }
};

UserSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();

  next();
});

const UserOthersInfos = mongoose.model<UserOthersInfos>(
  "UserOthers",
  UserOthersSchema
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export { User, UserOthersInfos };

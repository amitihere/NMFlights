const bcrypt = require("bcrypt");
const {UserDataset} = require("../schema/userDataset.js");
const createNewUser = async (data) => {
  try {
    const existingUser = await UserDataset.findOne({
      $or: [{ email: data.email }, { phone: data.phone }]
    });

    if (existingUser) {
      throw new Error("User with given email or phone already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await UserDataset.create({
      ...data,
      password: hashedPassword
    });
    return newUser;

  } catch (err) {
    console.error("Create user error:", err);
    throw err;
  }
};
const loginUser = async (data) => {
  try {
    const NotexistingUser = await UserDataset.findOne({ email: data.email });

    if (!NotexistingUser) {
      throw new Error("User with given email or phone does not exist");
    }

    const comparePassword = await bcrypt.compare(data.password, NotexistingUser.password);
    if(!comparePassword){
        throw new Error("The password is wrong please enter the correct password")
    }
    const { password, ...frontData } = NotexistingUser;
    return frontData;

  } catch (err) {
    console.error("Create user error:", err);
    throw err;
  }
};
module.exports = { createNewUser,loginUser };

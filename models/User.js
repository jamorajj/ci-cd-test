const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require("sequelize");
const sq = require("../config/database");
 
const User = sq.define("user", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

User.addHook('beforeSave', async (user, _options) => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
});

User.login = async function (email, password) {
  const user = await this.findOne({
    where: {
      email: email,
    }
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}
 
module.exports = User;

// function userModel(sequelize) {
//   const User = sequelize.define("user", {
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//   });
  
//   User.addHook('beforeSave', async (user, _options) => {
//     const salt = await bcrypt.genSalt();
//     user.password = await bcrypt.hash(user.password, salt);
//   });
  
//   User.login = async function (email, password) {
//     const user = await this.findOne({
//       where: {
//         email: email,
//       }
//     });
//     if (user) {
//       const auth = await bcrypt.compare(password, user.password);
//       if (auth) {
//         return user;
//       }
//       throw Error('incorrect password');
//     }
//     throw Error('incorrect email');
//   }

//   return User;
// }

// module.exports = userModel;
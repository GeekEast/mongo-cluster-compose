const mongoose = require('mongoose');
const casual = require('casual');
const { User, UserWithIndex } = require('./schema/user');

const init = async (count) => {
  for (let i = 0; i < count; i++) {
    await User.create({
      name: casual.name,
      email: casual.email,
      age: casual.integer((from = 1), (to = 100)),
      details: casual.description,
      birthDate: casual.date((format = 'YYYY-MM-DD')),
      favoriteFruit: casual.word,
    });
    await UserWithIndex.create({
      name: casual.name,
      email: casual.email,
      age: casual.integer((from = 1), (to = 100)),
      details: casual.description,
      birthDate: casual.date((format = 'YYYY-MM-DD')),
      favoriteFruit: casual.word,
    });
  }
};

(async () => {
    try {
      await mongoose.connect(
        `mongodb://${process.env.WRITE_NODE_URI}/users`,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      );
      await init(50);
      process.exit()
    } catch (err) {
      console.error(err);
    }
  })();

const mongoose = require('mongoose');
const { User, UserWithIndex } = require('./schema/user');
const { sample } = require('underscore');

// random select one one read node, this actually should be process in a load balancer
const readUrls = [process.env.READ_NODE1_URI, process.env.READ_NODE2_URI];
const readUrl = sample(readUrls);
console.log(readUrl);

(async () => {
  try {
    await mongoose.connect(`mongodb://${readUrl}/users`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
 

    const query = { age: { $gt: 22 } };

    console.time('query');
    await User.find(query).read('secondaryPreferred');
    console.timeEnd('query');

    console.time('query_with_index');
    await UserWithIndex.find(query).read('secondaryPreferred');
    console.timeEnd('query_with_index');

    console.time('query_with_select');
    await User.find(query)
      .select({ name: 1, _id: 1, age: 1, email: 1 })
      .read('secondaryPreferred');
    console.timeEnd('query_with_select');

    console.time('query_with_select_index');
    await UserWithIndex.find(query)
      .select({
        name: 1,
        _id: 1,
        age: 1,
        email: 1,
      })
      .read('secondaryPreferred');
    console.timeEnd('query_with_select_index');

    console.time('lean_query');
    await User.find(query).lean().read('secondaryPreferred');
    console.timeEnd('lean_query');

    console.time('lean_with_index');
    await UserWithIndex.find(query).lean().read('secondaryPreferred');
    console.timeEnd('lean_with_index');

    console.time('lean_with_select');
    await User.find(query)
      .select({ name: 1, _id: 1, age: 1, email: 1 })
      .lean()
      .read('secondaryPreferred');
    console.timeEnd('lean_with_select');

    console.time('lean_select_index');
    await UserWithIndex.find(query)
      .select({ name: 1, _id: 1, age: 1, email: 1 })
      .lean()
      .read('secondaryPreferred');
    console.timeEnd('lean_select_index');
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
})();

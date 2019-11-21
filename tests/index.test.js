const { expect } = require('chai');
const mongoose = require('mongoose');
const mongoIncrement = require('../src')(mongoose);

describe('mongo-increment', () => {
  let Users;

  before(async () => {
    mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    Users = mongoose.model('users', new mongoose.Schema({
      _id: Number,
      firstName: String,
      lastName: String,
      timestamp: Number,
    }, { _id: false }));

    await mongoIncrement(Users);

    await Promise.all([
      mongoose.models.users.deleteMany({}),
      mongoose.models.__counters.deleteMany({}),
    ]);
  });

  it('should insert one document', async () => {
    const { _id } = await Users.create({
      firstName: 'Mikhail',
      lastName: 'Semin',
      timestamp: Date.now(),
    });

    expect(_id).to.be.equal(0);
  });

  it('should insert a lot of documents', async () => {
    const operations = [];

    for (let i = 0; i < 100; i++) {
      operations.push(
        Users.create({
          firstName: 'Mikhail',
          lastName: `Semin #${i}`,
          timestamp: Date.now(),
        }),
      );
    }

    const items = await Promise.all(operations);

    items.forEach((item) => {
      expect(item._id).to.be.a('number').to.be.gte(1).to.be.lte(100);
    });
  });
});

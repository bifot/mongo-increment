const { Schema } = require('mongoose');

module.exports = (mongoose) => {
  return async (...models) => {
    const connection = await mongoose;

    const Counters = connection.model('__counters', new Schema({
      name: String,
      index: Number,
    }));

    models.forEach((model) => {
      const create = model.create.bind(model);

      model.create = async (doc, ...args) => {
        const counter = await Counters.findOneAndUpdate({
          name: model.collection.name,
        }, {
          $inc: {
            index: 1,
          },
        }, {
          upsert: true,
          returnNewDocument: true,
        });

        return create({
          ...doc,
          _id: counter ? counter.index : 0,
        }, ...args);
      };
    });
  }
};

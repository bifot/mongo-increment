# mongo-increment

Increment util for mongoose.

## Install

```sh
$ npm i mongo-increment -S
```

## Usage

```js
const mongoose = require('mongoose');
const mongoIncrement = require('mongo-increment')(mongoose);

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const Users = mongoose.model('users', new mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String,
}, { _id: false }));

const Reviews = mongoose.model('reviews', new mongoose.Schema({
  _id: Number,
  text: String,
  starts: Number,
}, { _id: false }));

mongoIncrement(Users, Reviews, ...); // => Promise

module.exports = {
  Users,
  Reviews,
};
```

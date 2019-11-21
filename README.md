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

const UsersSchema = new mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String,
}, { _id: false });

const ReviewsSchema = new mongoose.Schema({
  _id: Number,
  text: String,
  starts: Number,
}, { _id: false });

mongoIncrement(UsersSchema, ReviewsSchema, ...); // => Promise

module.exports = {
  Users: mongoose.model('users', UsersSchema),
  Reviews: mongoose.model('reviews', ReviewsSchema),
};
```

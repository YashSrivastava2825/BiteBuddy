const mongoose = require("mongoose");
//const mongoURI = 'mongodb+srv://BiteBuddy:yash123@cluster.gt6mdmp.mongodb.net/BiteBuddy?retryWrites=true&w=majority';
const mongoURI =
  "mongodb://BiteBuddy:yash123@ac-gkht8eh-shard-00-00.gt6mdmp.mongodb.net:27017,ac-gkht8eh-shard-00-01.gt6mdmp.mongodb.net:27017,ac-gkht8eh-shard-00-02.gt6mdmp.mongodb.net:27017/BiteBuddy?ssl=true&replicaSet=atlas-rik9r7-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    if (err) console.log("Error connecting to Mongo", err);
    else {
      console.log("connected");
      const fetched_data = mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "food_category"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log("Error");
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });

        // if(err) console.log("Error");
        // else {
        //     global.food_items = data;

        // }
      });
    }
  });
};

module.exports = mongoDB;

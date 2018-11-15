(async () => {
  let { mongoose } = await require("./mongo");
  console.log(mongoose);
  setTimeout(async () => {
    let result = await mongoose.db.collection("listings").findOne({ _id: 1 });
    console.log(result);
  }, 1000);
})();

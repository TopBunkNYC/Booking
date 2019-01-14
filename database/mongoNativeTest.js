(async () => {
  let { db } = await require("./mongo");
  console.log(db);
  let result = await db.db.collection("listings").findOne({ _id: 1 });
  console.log(result);
})();

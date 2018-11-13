use topBunk
db.counters.update({id: "_id"}, { $set: { seq: 1000} })
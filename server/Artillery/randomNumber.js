module.exports = { randomNumber };

function randomNumber(userContext, events, done) {
  userContext.vars.id = Math.ceil(Math.random() * 2000000);
  return done();
}

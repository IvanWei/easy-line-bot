const LineBot = require('../../api/services/LineBot');

describe('Test about Line Bot\'s Services', () => {
  describe('Authentication', () => {

    it('[Check Type] ', (done) => {
      LineBot.authentication({headers: {}})
      .then((result) => {
        result.should.be.an.Object().and.have.keys('hash', 'token', 'isValid');
        result.hash.should.be.String();
        result.hash.length.should.be.equal(44);
        result.token.should.be.String();
        result.isValid.should.be.Boolean();
        return done();
      })
      .catch((err) => {
        return done(err);
      });
    });

  });

  describe('Reply', () => {
    const testRequestOnLineWebhooks = {body: { events: [{"replyToken":"00000000000000000000000000000000","type":"message","timestamp":1451617200000,"source":{"type":"user","userId":"Udeadbeefdeadbeefdeadbeefdeadbeef"},"message":{"id":"100001","type":"text","text":"Hello,world"}},{"replyToken":"ffffffffffffffffffffffffffffffff","type":"message","timestamp":1451617210000,"source":{"type":"user","userId":"Udeadbeefdeadbeefdeadbeefdeadbeef"},"message":{"id":"100002","type":"sticker","packageId":"1","stickerId":"1"}}]
}};
    const requestWithFailed = {body: { events: {}}};

    it('[Sample] ', (done) => {
        LineBot.reply({}, testRequestOnLineWebhooks.body.events)
        .then((result) => {
          result.should.be.an.Array();
          result.length.should.be.equal(0);
          return done();
        })
        .catch((err) => {
          return done(err.message);
        });
    });

  });
});

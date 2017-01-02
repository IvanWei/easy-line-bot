const lineBot = require('../../api/services/lineBot');

describe('Test about Line Bot\'s Services', () => {
  describe('Authentication', () => {
    const requestObjWithScusses = {
      headers: {
        "x-line-signature":"mHYZTJ8ASoJC92E10IUkKB47UhYQ6NCSfjA33W/aQLQ="
      },
      body: {}
    };

    it('[Scusses] ', (done) => {
      const token = 'gU/Q11B0ILIzVJ/FImlyJtHxlsMkOGk42eP1mT+rjp3ovVHlFsoXvvhkTrYJjN4Ug9/Mh9osANcYUiKhh+/fl+0dhRH7dYli5i7XIIPpnijj5gNT5M890B3h46TyEESll1I1HqqF6+I+FUS4SVsfDAdB04t89/1O/w1cDnyilFU=';
      const result = lineBot.authentication(requestObjWithScusses);

      result.should.be.an.Object().and.have.keys('hash', 'token', 'isValid');
      result.hash.should.be.String().and.not.equal(requestObjWithScusses.headers['x-line-signature']);
      result.hash.length.should.be.equal(44);
      result.token.should.be.String().and.equal(token);
      // result.isValid.should.be.Boolean().and.equal(true);
      return done();
    });

  });

  describe.skip('Reply', () => {
    const requestWithScusses = {body: { events: {}}};
    const requestWithFailed = {body: { events: {}}};

    it('[Scusses] ', async (done) => {
      try {
        lineBot.reply();
        return done();

      } catch (err) {
        return done(err);
      }
    });

    // it('[Failed]', (done) => {
    //   try {
    //     await lineBot.reply();
    //     return done();

    //   } catch (err) {
    //     return done(err);
    //   }
    // });
  });
});

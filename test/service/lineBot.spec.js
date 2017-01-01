const lineBot = require('../../api/services/lineBot');

describe('Test about Line Bot\'s Services', () => {
  describe('Authentication', () => {
    const requestObjWithScusses = {
      headers: {
        'x-line-signature': null
      },
      body: {}
    };

    const requestObjWithFailed = {
      headers: {
        'x-line-signature': null
      },
      body: {}
    };

    it('[Scusses] ', (done) => {
      const token = '';
      const result = lineBot.authentication(requestObjWithScusses);

      result.should.be.an.Object().and.have.keys('hash', 'token', 'isValid');
      result.hash.should.be.String().and.not.equal(requestObjWithScusses.headers['x-line-signature']);
      result.hash.length.should.be.equal(44);
      result.token.should.be.String().and.equal(token);
      result.isValid.should.be.Boolean().and.equal(true);
      return done();
    });

    it('[Failed]', (done) => {
      const token = 'fake key';
      const result = lineBot.authentication(requestObjWithFailed);

      result.should.be.an.Object().and.have.keys('hash', 'token', 'isValid');
      result.hash.should.be.String().and.not.equal(requestObjWithFailed.headers['x-line-signature']);
      result.hash.length.should.be.equal(44);
      result.token.should.be.String().and.not.equal(token);
      result.isValid.should.be.Boolean().and.equal(false);
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

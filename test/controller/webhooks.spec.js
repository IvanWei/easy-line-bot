describe('Controller and service\' s testing.', () => {

  it('This is a Controller.', (done) => {

    request.get('/webhooks').end((err, res) => {
      if (err) return done(err); // 與 Server 相關錯誤
      if (res.statusCode !== 200) return done(res); // 與 API 有關的錯誤

      const result = res.text;
      result.should.equal('It works Now!');

      // result.should.be.Object();
      // result.should.have.keys('message');
      // result.message.should.be.equal('Use API!');
      return done();
    })
  });

  // it('This is a Service.', (done) => {
  //   request.get('/demo/service').end((err, res) => {
  //     if (err) return done(err);
  //     if (res.statusCode !== 200) return done(res.body);

  //     const result = res.body;

  //     result.should.be.Object();
  //     result.should.have.keys('message');
  //     result.message.should.be.equal('Service is Ok!');
  //     return done();
  //   });
  // });
});

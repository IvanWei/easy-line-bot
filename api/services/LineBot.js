const crypto = require('crypto');
const request = require('request-promise');
const CustomError = require('../../config/CustomError');
const LineRequest = require(`${__dirname}/LineRequest`).request;

module.exports = {
  authentication: (requestObj) => {
    const channelSecret = process.env.lineChannelSecret || '';
    const channelAccessToken = process.env.lineChannelAccessToken || '';

    const xLineSignature = requestObj.headers['x-line-signature'];
    const requestBody = requestObj.body || {};

    const hash = crypto.createHmac('sha256', channelSecret)
                .update(Buffer.from(JSON.stringify(requestBody), 'utf8'))
                .digest('base64');

    return {
      hash: hash,
      token: channelAccessToken,
      isValid: (hash === xLineSignature),
    };
  },
  reply: async (auth, requestEvents) => {
    let replyMessages;
    const checkResult = LineRequest.checkRequestEventsCount(requestEvents);

    if (!checkResult.isPass)
      return Promise.reject(checkResult);


    replyMessages = requestEvents.reduce((originData, currentReplyParam) => {
      if ( LineRequest.isFakeReply(currentReplyParam.replyToken) )
        return originData;

      const replyType = currentReplyParam.type;

      switch (replyType) {
        case 'message':
            originData.push(LineRequest.createReplyRequest(auth, currentReplyParam ));

          break;
        // case 'follow':

        //   break;
        // case 'unfollow':

        //   break;
        // case 'join':

        //   break;
        // case 'leave':

        //   break;
        // case 'postback':

        //   break;
        // case 'beacon':

        //   break;
      }

      return originData;
    }, []);

    try {
      return await Promise.all(replyMessages);

    } catch (e) {
      return e;
    }
  },
};

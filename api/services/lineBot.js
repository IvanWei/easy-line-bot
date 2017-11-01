const crypto = require('crypto');
const rp = require('request-promise');
const CustomError = require('../../config/CustomError');

module.exports = {
  authentication: (req) => {
    const channelSecret = process.env.lineChannelSecret || '';
    const channelAccessToken = process.env.lineChannelAccessToken || '';

    const xLineSignature = req.get('X-Line-Signature');
    const reqBody = req.body || '';

    const hash = crypto.createHmac('sha256', channelSecret)
                .update(Buffer.from(JSON.stringify(reqBody)))
                .digest('base64');
    console.log('xLineSignatureA:: ', xLineSignature)
    console.log('xLineSignatureB:: ', hash)

    return {
      hash: hash,
      token: channelAccessToken,
      isValid: (hash === xLineSignature),
    };
  },
  reply: async (auth, requestEvents) => {
    let replyMessages;
    const checkResult = checkRequestEventsCount(requestEvents);

    if (!checkResult.isPass)
      return Promise.reject(checkResult);


    replyMessages = requestEvents.reduce((originData, currentReplyParam) => {
      if ( isFakeReply(currentReplyParam.replyToken) )
        return originData;

      const replyType = currentReplyParam.type;
      console.log('replyType:: ', replyType)

      switch (replyType) {
        case 'message':
            originData.push(CREATE_REPLY_REQUEST_OPTIONS(auth, currentReplyParam ));

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
      await Promise.all(replyMessages);

    } catch (e) {
      return e;
    }
  }
};

function isFakeReply (replyToken) {
  // This tokens are fake from Test of Line Webhooks.
  return !!(replyToken === '00000000000000000000000000000000' || replyToken === 'ffffffffffffffffffffffffffffffff');
};

function checkRequestEventsCount (requestEvents) {
  let result = {isPass: true, error: null};

  if (!Array.isArray(requestEvents)) {
    result.isPass = false;
    result.error = new CustomError('The request\'s event need an Array.', 400);

  } else if (requestEvents.length > 5) {
    result.isPass = false;
    result.error = new CustomError('Bad Request! Too many request events.', 400);

  }

  return result;
}

function createReplyMessage (messageParam) {
  switch ( messageParam.type ) {
    case 'text':
      return [{
              type: 'text',
              text: '是文字',
            }];

      break;
    case 'image':
      return [{
              type: 'text',
              text: '是圖片',
            }];

      // // originalContentUrl ( Max 1000 characters) , only use HTTPS and JPEG ( 1024 x 1024, 1 MB )
      // // previewImageUrl ( Max 1000 characters) , only use HTTPS and JPEG ( 240 x 240, 1 MB )
      // return [{
      //   type: 'image',
      //   originalContentUrl: '',
      //   previewImageUrl: '',
      // }];

      break;
    case 'video':
      return [{
              type: 'text',
              text: '是影像',
            }];

      // // originalContentUrl ( Max 1000 characters) , only use HTTPS and mp4 ( Less than 1 minute, 10 MB )
      // // previewImageUrl ( Max 1000 characters) , only use HTTPS and JPEG ( 240 x 240, 1 MB )
      // return [{
      //   type: 'video',
      //   originalContentUrl: '',
      //   previewImageUrl: '',
      // }];

      break;
    case 'audio':
      return [{
              type: 'text',
              text: '是聲音',
            }];

      // // originalContentUrl ( Max 1000 characters) , only use HTTPS and m4a ( Less than 1 minute, 10 MB )
      // // duration ( Number, Length of audio file (milliseconds) )
      // return {
      //   type: 'audio',
      //   originalContentUrl: '',
      //   duration: 0,
      // };

      break;
    case 'location':
      return [{
              type: 'text',
              text: '是位置',
            }];

      // // title ( Max 100 characters )
      // // address ( Max 100 characters )
      // // latitude ( Decimal )
      // // longitude ( Decimal )
      // return [{
      //   type: 'location',
      //   title: '',
      //   address: '',
      //   latitude: 0.0,
      //   longitude: 0.0,
      // }]

      break;
    case 'sticker':
      return [{
              type: 'text',
              text: '是貼圖',
            }];

      // return [{
      //   type: 'sticker',
      //   packageId: '',
      //   stickerId: '',
      // }]

      break;
    // case 'imagemap':

    //   break;
    // case 'template':

    //   break;
    default:
      return [];
  }
};

function CREATE_REPLY_REQUEST_OPTIONS (auth, replyMessage) {
  let options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`,
    },
    body: {
      replyToken: replyMessage.replyToken,
      messages: createReplyMessage(replyMessage.message),
    },
    json: true,
  }

  return rp(options);
}

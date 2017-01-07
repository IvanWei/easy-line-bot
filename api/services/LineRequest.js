const request = require('request-promise');
const CustomError = require('../../config/CustomError');

const self = exports.request = {
  isFakeReply: (replyToken) => {
    // This tokens are fake from Test of Line Webhooks.
    const isFakeReply = !!(replyToken === '00000000000000000000000000000000' || replyToken === 'ffffffffffffffffffffffffffffffff');
    return isFakeReply;
  },
  checkRequestEventsCount: (requestEvents) => {
    const result = { isPass: true, error: null };

    if (!Array.isArray(requestEvents)) {
      result.isPass = false;
      result.error = new CustomError('The request\'s event need an Array.', 400);
    } else if (requestEvents.length > 5) {
      result.isPass = false;
      result.error = new CustomError('Bad Request! Too many request events.', 400);
    }

    return result;
  },
  createReplyRequest: (auth, replyMessage) => {
    const options = {
      method: 'POST',
      uri: 'https://api.line.me/v2/bot/message/reply',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: {
        replyToken: replyMessage.replyToken,
        messages: self.createReplyMessageContents(replyMessage.message),
      },
      json: true,
    };

    return request(options);
  },
  createReplyMessageContents: (messageParam) => {
    let content;

    switch (messageParam.type) {
      case 'text':
        content = [{
          type: 'text',
          text: '是文字',
        }];
        break;
      case 'image':
        content = [{
          type: 'text',
          text: '是圖片',
        }];

        // /*
        //    1. Only use HTTPS and JPEG
        //    2. Max 1000 characters
        //    3. originalContentUrl ( 1024 x 1024, 1 MB )
        //    4. previewImageUrl ( 240 x 240, 1 MB )
        // */
        // content = [{
        //   type: 'image',
        //   originalContentUrl: '',
        //   previewImageUrl: '',
        // }];

        break;
      case 'video':
        content = [{
          type: 'text',
          text: '是影像',
        }];

        // /*
        //    1. Only use HTTPS
        //    2. Max 1000 characters
        //    3. originalContentUrl ( Only use mp4 and Less than 1 minute, 10 MB )
        //    4. previewImageUrl ( Only use JPEG and 240 x 240, 1 MB )
        // */
        // content = [{
        //   type: 'video',
        //   originalContentUrl: '',
        //   previewImageUrl: '',
        // }];

        break;
      case 'audio':
        content = [{
          type: 'text',
          text: '是聲音',
        }];

        // /*
        //    1. Only use HTTPS
        //    2. Max 1000 characters
        //    3. originalContentUrl ( Only use m4a and Less than 1 minute, 10 MB )
        //    4. duration ( Number, Length of audio file (milliseconds) )
        // */
        // content = {
        //   type: 'audio',
        //   originalContentUrl: '',
        //   duration: 0,
        // };

        break;
      case 'location':
        content = [{
          type: 'text',
          text: '是位置',
        }];

        // /*
        //    1. title ( Max 100 characters )
        //    2. address ( Max 100 characters )
        //    3. latitude ( Decimal )
        //    4. longitude ( Decimal )
        // */
        // content = [{
        //   type: 'location',
        //   title: '',
        //   address: '',
        //   latitude: 0.0,
        //   longitude: 0.0,
        // }]

        break;
      case 'sticker':
        content = [{
          type: 'text',
          text: '是貼圖',
        }];

        // content = [{
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
        content = [];
    }
    return content;
  },
};

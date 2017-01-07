exports.request = {
  isFakeReply: async (replyToken) => {
    // This tokens are fake from Test of Line Webhooks.
    return !!(replyToken === '00000000000000000000000000000000' || replyToken === 'ffffffffffffffffffffffffffffffff');
  },
  checkRequestEventsCount: (requestEvents) => {
    let result = {isPass: true, error: null};

    if (!Array.isArray(requestEvents)) {
      result.isPass = false;
      result.error = new CustomError('The request\'s event need an Array.', 400);

    } else if (requestEvents.length > 5) {
      result.isPass = false;
      result.error = new CustomError('Bad Request! Too many request events.', 400);

    }

    return result;
  },
  createReplyMessageContents: async (messageParam) => {
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
  },
  createReplyRequest: async (auth, replyMessage) => {
    let options = {
      method: 'POST',
      uri: 'https://api.line.me/v2/bot/message/reply',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
      body: {
        replyToken: replyMessage.replyToken,
        messages: createReplyMessageContents(replyMessage.message),
      },
      json: true,
    }

    return request(options);
  },
};

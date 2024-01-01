const axios = require("axios");

// 자주 쓰는 URL을 상수로 뺀다
const URL = `http://localhost:${process.env.API_PORT}/v1`;
/**
 * 요청을 보낼때 headers에 origin값을 넣어야한다.
 * origin값은 요청보내는 주소이다.
 * 과거의 방식
 * axios.default.headers.origin = `http://localhost:${process.env.PORT}`;
 */
axios.default.headers.common.origin = `http://localhost:${process.env.PORT}`;

/**
 * getMyPosts(), searchByHashtag()
 * 두 함수에서 공통적으로 쓸 부분을  추출하여 request 객체에 저장한다.
 * 두 함수 모두 token 발급 받고 만료되었으면 갱신하고
 * 그 이후에 api 요청하는 흐름으로 이어진다.
 */
const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      //발급 받은 이후에는 session에다가 token을 저장한다.
      // session에 토큰이 없으면 발급 신청한다.
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`);
  } catch (error) {
    console.error(error);
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    await require(req, "/posts/my");
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.searchByHashtag = async (req, res, next) => {
  try {
    await require(req, `/posts/hashtag/${req.params.hashtag}`);
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// exports.test = async (req, res, next) => {
//   try {
//     console.log("It is root route");
//     if (!req.session.jwt) {
//       //   res.send("Token is vailded");
//       // console.log(`#process.env.CLIENT_SECRET: ${process.env.CLIENT_SECRET}`);
//       const tokenResult = await axios.post(
//         `http://localhost:${process.env.API_PORT}/v1/token`,
//         {
//           clientSecret: process.env.CLIENT_SECRET,
//         }
//       );
//       /**
//        * 매번 토큰을 발급 받는 것은 낭비이므로 session에 저장한다.
//        */
//       if (tokenResult?.data?.code === 200) {
//         req.session.jwt = tokenResult.data.token;
//         //   res.send("Token is vailded");
//       } else {
//         // token 발급 실패시 처리
//         return res.status(tokenResult.data?.code).json(tokenResult.data);
//       }
//     }
//     // jwt는 headers에 authorization을 넣는다.
//     const result = await axios.get(
//       `http://localhost:${process.env.API_PORT}/v1/test`,
//       {
//         headers: { authorization: req.session.jwt },
//       }
//     );
//     return res.json(result.data);
//   } catch (error) {
//     console.error(error);
//     if (error.response?.status === 419) {
//       res.status(419).json(error.response.data);
//     }
//     return next(error);
//   }
// };

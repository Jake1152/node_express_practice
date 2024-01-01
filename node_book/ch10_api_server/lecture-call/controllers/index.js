const axios = require("axios");

exports.test = async (req, res, next) => {
  try {
    console.log("It is root route");
    if (!req.session.jwt) {
      //   res.send("Token is vailded");
      // console.log(`#process.env.CLIENT_SECRET: ${process.env.CLIENT_SECRET}`);
      const tokenResult = await axios.post(
        `http://localhost:${process.env.API_PORT}/v1/token`,
        {
          clientSecret: process.env.CLIENT_SECRET,
        }
      );
      /**
       * 매번 토큰을 발급 받는 것은 낭비이므로 session에 저장한다.
       */
      if (tokenResult?.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
        //   res.send("Token is vailded");
      } else {
        // token 발급 실패시 처리
        return res.status(tokenResult.data?.code).json(tokenResult.data);
      }
    }
    // jwt는 headers에 authorization을 넣는다.
    const result = await axios.get(
      `http://localhost:${process.env.API_PORT}/v1/test`,
      {
        headers: { authorization: req.session.jwt },
      }
    );
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) {
      res.status(419).json(error.response.data);
    }
    return next(error);
  }
};

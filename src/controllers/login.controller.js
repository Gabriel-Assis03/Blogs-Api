const mapStatusHTTP = require('../middlewares/mapStatusHTTP');
const { loginService } = require('../services');

const postLogin = async (req, res) => {
  const { status, data } = await loginService.postLogin(req);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  postLogin,
};

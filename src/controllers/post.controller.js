const mapStatusHTTP = require('../middlewares/mapStatusHTTP');
const { postService } = require('../services');

const postPost = async (req, res) => {
  const { status, data } = await postService.postPost(req);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  postPost,
};
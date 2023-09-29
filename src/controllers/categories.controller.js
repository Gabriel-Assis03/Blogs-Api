const mapStatusHTTP = require('../middlewares/mapStatusHTTP');
const { categoriesService } = require('../services');

const postCategories = async (req, res) => {
  const { status, data } = await categoriesService.postCategories(req);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  postCategories,
};
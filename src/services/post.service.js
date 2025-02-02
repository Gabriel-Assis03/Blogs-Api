const { BlogPost, PostCategory } = require('../models');
const { validatePost } = require('./validations/validationsInputValues');
// const { creatToken } = require('../middlewares/token');

const postPost = async (req) => {
  const error = await validatePost(req.body);
  if (error) return { status: error.status, data: { message: error.message } };
  const {
    title, content, categoryIds,
  } = req.body;
  const userId = req.user.dataValues.id;
  const newPost = await BlogPost.create({
    title,
    content,
    userId,
  });
  const category = categoryIds.map((e) => PostCategory.create({
    postId: newPost.id,
    categoryId: e,
  }));
  await Promise.all(category);
  return { status: 'CREATED', data: newPost };
};

module.exports = {
  postPost,
};

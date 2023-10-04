const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type: DataTypes.INTEGER, 
        foreignKey: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'books',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;

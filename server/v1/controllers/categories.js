import { Category, Article, User, Comment, Sequelize } from '../../models';

const { Op } = Sequelize;

export const createCategory = async (req, res) => {
  try {
    const { body: data } = req;
  
    const user = await Category.create(data);
    
    return res.status(201).send({
      data: user
    })
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const getCategory = async (req, res) => {
  const { params: { categoryId }} = req;
  const category = await Category.findByPk(categoryId, {
    attributes: ['name'],
    include: {
      model: Article,
      as: 'articles',
      attributes: { exclude: ['createdAt', 'updatedAt', 'categoryId', 'authorId'] },
      include: [{
        model: User,
        as: 'owner',
        attributes: ['firstname', 'lastname'],
      }, {
        model: Comment,
        as: 'comments',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
          model: User,
          as: 'owner',
          attributes: ['firstname', 'lastname'],
        }
      }]
    }
  });

  const categoryData = category.toJSON();
  
  // add all relevant properties to the categoryData

  return res.status(200).send({
    data: categoryData
  });
}

export const updateCategory = async (req, res) => {
  const { params: { categoryId }, body } = req;

  try {
    const category = await Category.findByPk(categoryId);
  
    if(!category) {
      return res.status(404).send({
        status: 'fail',
        message: 'Not Found'
      });
    }
  
    const updatedCategory = await category.update(body);
  
    const categoryData = updatedCategory.toJSON();
    
    // add all relevant properties to the categoryData
  
    return res.status(200).send({
      data: categoryData
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const deleteCategory = async (req, res) => {
  const { params: { categoryId } } = req;

  try {
    const category = await Category.findByPk(categoryId);
  
    if(!category) {
      return res.status(404).send({
        status: 'fail',
        message: 'Not Found'
      });
    }
  
    await category.destroy();
    // add all relevant properties to the categoryData
  
    return res.status(204).send({
      status: 'success'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
} 

export const getAllCategories = async (req, res) => {

  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      include: {
        model: Article,
        as: 'articles',
        attributes: { exclude: ['createdAt', 'updatedAt', 'categoryId', 'authorId'] },
        include: [{
          model: User,
          as: 'owner',
          attributes: ['firstname', 'lastname'],
        }, {
          model: Comment,
          as: 'comments',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: {
            model: User,
            as: 'owner',
            attributes: ['firstname', 'lastname'],
          }
        }]
      }
    });
  
    return res.status(200).send({
      status: 'success',
      data: categories
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}
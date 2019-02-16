import { Article } from '../../models';

export const createArticle = async (req, res) => {
  const { body } = req;
  body.slug = body.title.replace(/\s+/g, '-').toLowerCase();

  try {
    const newArticle = await Article.create(body);
    // add all relevant properties to the articleData

    return res.status(201).send({
      data: newArticle
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const getArticle = async (req, res) => {
  const { params: { articleId } } = req;

  try {
    const article = await Article.findByPk(articleId);

    if (!article) {
      return res.status(404).send({
        status: 'fail',
        message: 'Not Found'
      });
    }
  
    const articleData = article.toJSON();
    
    // add all relevant properties to the articleData
  
    return res.status(200).send({
      data: articleData
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const updateArticle = async (req, res) => {
  const { params: { articleId }, body } = req;

  try {
    const article = await Article.findByPk(articleId);
  
    if (!article) {
      return res.status(404).send({
        status: 'fail',
        message: 'Not Found'
      });
    }
  
    const updatedArticle = await article.update(body);
  
    const articleData = updatedArticle.toJSON();
    
    // add all relevant properties to the articleData
  
    return res.status(200).send({
      data: articleData
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const deleteArticle = async (req, res) => {
  const { params: { articleId } } = req;

  try {
    const article = await Article.findByPk(articleId);
  
    if(!article) {
      return res.status(404).send({
        status: 'fail',
        message: 'Not Found'
      });
    }
  
    await article.destroy();
    // add all relevant properties to the articleData
  
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

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    
    // add all relevant properties to the articleData
  
    return res.status(200).send({
      status: 'success',
      data: articles
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}
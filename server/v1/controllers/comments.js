import { Article, Comment, Sequelize } from '../../models';

const { Op } = Sequelize;

export const createComment = async (req, res) => {
  const { body: { body: commentBody, userId }, params: { articleId } } = req;

  try {
    const foundArticle = await Article.findByPk(articleId);

    if (!foundArticle) {
      return res.status(404).send({
        status: 'fail',
        message: 'Article Not Found'
      });
    }

    const newComment = await foundArticle.createComment({
      userId,
      body: commentBody,
    });

    return res.status(201).send({
      data: newComment
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const updateComment = async (req, res) => {
  const { params: { articleId, commentId }, body } = req;

  try {
    const foundArticle = await Article.findByPk(articleId);
    if (!foundArticle) {
      return res.status(404).send({
        status: 'fail',
        message: 'Article Not Found'
      });
    }

    const foundArticleComments = await foundArticle.getComments({
      where: { id: { [Op.eq]: commentId } }
    });

    const foundArticleComment = foundArticleComments[0];
    
    if (!foundArticleComment) {
      return res.status(404).send({
        status: 'fail',
        message: 'Comment Not Found under Article'
      });
    }
  
    const updatedComment = await foundArticleComment.update(body);
  
    const commentData = updatedComment.toJSON();
  
    return res.status(200).send({
      data: commentData
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const deleteComment = async (req, res) => {
  const { params: { commentId } } = req;

  try {
    const comment = await Comment.findByPk(commentId);
  
    if(!comment) {
      return res.status(404).send({
        status: 'fail',
        message: 'Comment Not Found'
      });
    }
  
    await comment.destroy();
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
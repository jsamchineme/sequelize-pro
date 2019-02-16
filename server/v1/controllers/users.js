import { User } from '../../models';

export const userSignup = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.create(data);
    
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

export const followUser = async (req, res) => {
  const { body: { followerId }, params: { userId }} = req;

  try {
    const user = await User.findByPk(userId);
    const follower = await User.findByPk(followerId);
  
    await user.addFollowers(follower);
  
    const userData = user.toJSON();
  
    // add all relevant properties to the userData
    userData.followers = await user.getFollowers({
      attributes: ['id', 'firstname']
    }).map(item => item.id);
  
    userData.followings = await user.getFollowings({
      attributes: ['id', 'firstname']
    }).map(item => item.id);
  
    return res.status(200).send({
      data: userData
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}

export const getUser = async (req, res) => {
  const { params: { userId }} = req;

  try {
    const user = await User.findByPk(userId);
  
    const userData = user.toJSON();
    
     // add all relevant properties to the userData
    userData.followers = await user.getFollowers({
      attributes: ['id', 'firstname']
    }).map(item => item.id);
  
    userData.followings = await user.getFollowings({
      attributes: ['id', 'firstname']
    }).map(item => item.id);
  
    return res.status(200).send({
      data: userData
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    })
  }
}
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import _cloudinary from 'cloudinary';
import { User } from '../../models';

dotenv.config();

export const userSignup = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.create(data);

    return res.status(201).send({
      data: user
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error
    });
  }
};

export const followUser = async (req, res) => {
  const { body: { followerId }, params: { userId } } = req;

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
    });
  }
};

export const getUser = async (req, res) => {
  const { params: { userId } } = req;

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
    });
  }
};

export const uploadImage = async (req, res) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage }).single('name-of-input-key');
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }

    // SEND FILE TO CLOUDINARY
    const cloudinary = _cloudinary.v2;

    const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUD_NAME } = process.env;
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET
    });

    const { path } = req.file;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `profiles/${uniqueFilename}`, tags: 'profiles' }, // directory and tags are optional
      function (err, image) {
        if (err) return res.send(err);
        // remove file from server
        fs.unlinkSync(path);
        // return image details
        res.json(image);
      }
    );
  });
};

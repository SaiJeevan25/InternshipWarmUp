import { createCompanyProfile, getCompanyProfile, updateCompanyProfile } from '../models/companyModel.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';
import createError from 'http-errors';

export const registerCompany = async (req, res, next) => {
  try {
    const owner_id = req.user.id;
    const data = req.body;
    const company = await createCompanyProfile({ ...data, owner_id });
    res.status(201).json({ success: true, message: 'Company registered successfully.', data: { company_id: company.id } });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const owner_id = req.user.id;
    const profile = await getCompanyProfile(owner_id);
    if (!profile) return next(createError(404, 'Company profile not found'));
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const owner_id = req.user.id;
    const data = req.body;
    const updated = await updateCompanyProfile(owner_id, data);
    res.json({ success: true, message: 'Profile updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
};

export const uploadLogo = async (req, res, next) => {
  try {
    const { file } = req;
    const url = await uploadToCloudinary(file, 'logo');
    res.json({ success: true, url });
  } catch (err) {
    next(err);
  }
};

export const uploadBanner = async (req, res, next) => {
  try {
    const { file } = req;
    const url = await uploadToCloudinary(file, 'banner');
    res.json({ success: true, url });
  } catch (err) {
    next(err);
  }
};

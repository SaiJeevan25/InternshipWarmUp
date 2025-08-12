import pool from '../config/db.js';

export const getUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};

export const createUser = async ({ email, password, full_name, gender, mobile_no, signup_type }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password, full_name, gender, mobile_no, signup_type)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [email, password, full_name, gender, mobile_no, signup_type]
  );
  return rows[0];
};

export const setMobileVerified = async (mobile_no) => {
  await pool.query('UPDATE users SET is_mobile_verified = true WHERE mobile_no = $1', [mobile_no]);
};

export const setEmailVerified = async (email) => {
  await pool.query('UPDATE users SET is_email_verified = true WHERE email = $1', [email]);
};

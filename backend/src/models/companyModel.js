import pool from '../config/db.js';

export const createCompanyProfile = async (data) => {
  const {
    owner_id, company_name, address, city, state, country, postal_code, website, logo_url, banner_url, industry, founded_date, description, social_links
  } = data;
  const { rows } = await pool.query(
    `INSERT INTO company_profile (owner_id, company_name, address, city, state, country, postal_code, website, logo_url, banner_url, industry, founded_date, description, social_links)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [owner_id, company_name, address, city, state, country, postal_code, website, logo_url, banner_url, industry, founded_date, description, social_links]
  );
  return rows[0];
};

export const getCompanyProfile = async (owner_id) => {
  const { rows } = await pool.query('SELECT * FROM company_profile WHERE owner_id = $1', [owner_id]);
  return rows[0];
};

export const updateCompanyProfile = async (owner_id, data) => {
  // For simplicity, update all fields if provided
  const fields = Object.keys(data);
  const values = Object.values(data);
  let setStr = fields.map((f, i) => `${f} = $${i + 2}`).join(', ');
  const query = `UPDATE company_profile SET ${setStr} WHERE owner_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [owner_id, ...values]);
  return rows[0];
};

const URL = '/api/companies';

export const COMPANY_ENDPOINTS = {
  getAll: `${URL}/all`,
  getById: (id) => `${URL}/${id}`,
  create: `${URL}/create`,
  update: (id) => `${URL}/update/${id}`,
  delete: (id) => `${URL}/delete/${id}`,
  
  getCompanyGames: `/api/company-games`,
  getCompanyGamesByCompanyId: (companyId) => `/company-games/${companyId}`,
};
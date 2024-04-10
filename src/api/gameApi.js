const URL = '/api/games';

export const GAME_ENDPOINTS = {
  getAll: `${URL}/all`,
  getById: (id) => `${URL}/${id}`,
  getByName: `${URL}/search`,
  create: `${URL}/create`,
  update: (id) => `${URL}/update/${id}`,
  delete: (id) => `${URL}/delete/${id}`,
};
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:3000/api';
class CategoryService {
  static async createCategory(categoryData) {
    try {
      const response = await axios.post(`${BASE_URL}/categories`, categoryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  static async getCategories() {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }

  static async deleteCategoryById(categoryId) {
    try {
      const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }
}

export default CategoryService;

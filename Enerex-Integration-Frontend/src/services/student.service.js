import { authService } from "./auth.service";

export class StudentService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }

  async getStudents() {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No valid token found");
    }

    try {
      const response = await fetch(`${this.baseUrl}/student/getStudents`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }

  async addStudent(studentData) {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No valid token found");
    }

    try {
      const response = await fetch(`${this.baseUrl}/student/addStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      return response;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  }

  async deleteStudent(studentId) {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No valid token found");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/student/deleteStudent/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  }

  async updateStudent(studentId, data) {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No valid token found");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/student/updateStudent/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  }
}

export const studentService = new StudentService();

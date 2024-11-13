const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { createToken } = require("../utils/auth");

const resolvers = {
  Query: {
    employees: async (_, { page = 1, limit = 10 }, { user }) => {
      if (!user) throw new Error("Authentication required");
      return await Employee.find()
        .skip((page - 1) * limit)
        .limit(limit);
    },
    employee: async (_, { id }, { user }) => {
      if (!user) throw new Error("Authentication required");
      return await Employee.findById(id);
    },
  },

  Mutation: {
    addUser: async (_, { username, password, role }) => {
      if (!["Admin", "Employee"].includes(role)) {
        throw new Error("Invalid role specified");
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Create new user with hashed password
      const user = new User({ username, password, role });
      await user.save();

      // Generate JWT token
      return createToken(user);
    },
    addEmployee: async (_, args, { user }) => {
      if (!user || user.role !== "Admin") throw new Error("Access denied");
      return await Employee.create(args);
    },
    updateEmployee: async (_, { id, ...updates }, { user }) => {
      if (!user || user.role !== "Admin") throw new Error("Access denied");
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
  },
};

module.exports = resolvers;

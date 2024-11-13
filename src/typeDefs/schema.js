const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String]
    attendance: Int
  }

  type Query {
    employees(page: Int, limit: Int): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String]
      attendance: Int
    ): Employee

    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      subjects: [String]
      attendance: Int
    ): Employee

    addUser(username: String!, password: String!, role: String!): String
  }
`;

module.exports = typeDefs;

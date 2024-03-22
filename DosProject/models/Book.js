const { DataTypes } = require('sequelize');
const sequelize = require('../modals/db');

// Define the Book model
const Book = sequelize.define('book', {
    bookID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'book',
    timestamps: false
});

module.exports = Book;

const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/pengelola_keuangan"); // Make sure to correct the database name

const Anggaran = sequelize.define('Anggaran', {
    id_anggaran: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nilai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'anggaran',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Anggaran;

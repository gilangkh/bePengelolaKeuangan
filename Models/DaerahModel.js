const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/pengelola_kauangan");

const Daerah = sequelize.define('Daerah', {
    id_daerah: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_daerah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    umr: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    tableName: 'daerah',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Daerah;

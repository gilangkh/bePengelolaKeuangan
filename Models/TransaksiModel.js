const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/pengelola_kauangan");

const Transaksi = sequelize.define('Transaksi', {
    id_transaksi: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_kategori: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_jenis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_aset: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
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
    tableName: 'transaksi',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Transaksi;

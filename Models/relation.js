const User = require('./UserModel')
const Aset = require('./AsetModel')
const Daerah = require('./DaerahModel')
const JenisTransaksi = require('./JenisTransaksiModel')
const Kategori = require('./KategoriModel')
const Transaksi = require('./TransaksiModel')

Aset.hasMany(Transaksi, { foreignKey: 'id_aset' });
Transaksi.belongsTo(Aset, { foreignKey: 'id_aset' });

Daerah.hasMany(User, { foreignKey: 'id_daerah' });
User.belongsTo(Daerah, { foreignKey: 'id_daerah' });

User.hasMany(Transaksi, { foreignKey: 'id_user' });
Transaksi.belongsTo(User, { foreignKey: 'id_user' });

Kategori.hasMany(Transaksi, { foreignKey: 'id_kategori' });
Transaksi.belongsTo(Kategori, { foreignKey: 'id_kategori' });

JenisTransaksi.hasMany(Transaksi, { foreignKey: 'id_jenis' });
Transaksi.belongsTo(JenisTransaksi, { foreignKey: 'id_jenis' });

Kategori.hasMany(JenisTransaksi, { foreignKey: 'id_jenis' });
JenisTransaksi.belongsTo(Kategori, { foreignKey: 'id_jenis' });


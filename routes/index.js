const express = require('express');
const { getAllDaerah, createDaerah, updateDaerah, deleteDaerah, getDaerah } = require('../Controllers/DaerahController');
const { getAllUser, createUser, updateUser, deleteUser, getUser } = require('../Controllers/UserController');
const { getAllTransaksi, createTransaksi, updateTransaksi, deleteTransaksi, getTransaksi } = require('../Controllers/TransaksiController');
const { getAllKategori, createKategori, updateKategori, deleteKategori, getKategori } = require('../Controllers/KategoriController');
const { getAllJenisTransaksi, createJenisTransaksi, updateJenisTransaksi, deleteJenisTransaksi, getJenisTransaksi } = require('../Controllers/JenisTransaksiController');
const { getAllAset, createAset, updateAset, deleteAset, getAset } = require('../Controllers/AsetControlles');
const { login, logout } = require('../Controllers/AuthController');
const { authenticateToken } = require('../middleware/authToken');

const router = express.Router();

router.post('/login',login)
router.get('/logout',logout)
router.get('/user', getAllUser);
router.post('/user', createUser);
//Aset 
router.use(authenticateToken)

router.get('/aset', getAllAset);
router.post('/aset', createAset);
router.get('/aset/:id_aset', getAset);
router.put('/aset/:id_aset', updateAset);
router.delete('/aset/:id_aset', deleteAset);

// Daerah
router.get('/daerah', getAllDaerah);
router.post('/daerah', createDaerah);
router.get('/daerah/:id_daerah', getDaerah);
router.put('/daerah/:id_daerah', updateDaerah);
router.delete('/daerah/:id_daerah', deleteDaerah);

// User

router.get('/user/:id_user', getUser);
router.put('/user/:id_user', updateUser);
router.delete('/user/:id_user', deleteUser);

// Transaksi
router.get('/transaksi', getAllTransaksi);
router.post('/transaksi', createTransaksi);
router.get('/transaksi/:id_transaksi', getTransaksi);
router.put('/transaksi/:id_transaksi', updateTransaksi);
router.delete('/transaksi/:id_transaksi', deleteTransaksi);

// Kategori
router.get('/kategori', getAllKategori);
router.post('/kategori', createKategori);
router.get('/kategori/:id_kategori', getKategori);
router.put('/kategori/:id_kategori', updateKategori);
router.delete('/kategori/:id_kategori', deleteKategori);

// JenisTransaksi
router.get('/jenistransaksi', getAllJenisTransaksi);
router.post('/jenistransaksi', createJenisTransaksi);
router.get('/jenistransaksi/:id_jenis', getJenisTransaksi);
router.put('/jenistransaksi/:id_jenis', updateJenisTransaksi);
router.delete('/jenistransaksi/:id_jenis', deleteJenisTransaksi);

module.exports = router;

const User = require('../Models/UserModel');

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(501).json(error.message);
    }
};

const createUser = async (req, res) => {
    try {
        const { id_user, id_daerah, nama, email, password } = req.body;

        const errorMessage = !id_user && !id_daerah && !nama && !email && !password
            ? "ID User, ID Daerah, Nama, Email, dan Password tidak boleh kosong"
            : !id_user
                ? "ID User tidak boleh kosong"
                : !id_daerah
                    ? "ID Daerah tidak boleh kosong"
                    : !nama
                        ? "Nama tidak boleh kosong"
                        : !email
                            ? "Email tidak boleh kosong"
                            : !password
                                ? "Password tidak boleh kosong"
                                : null;

        if (errorMessage) {
            res.status(403).json({ error: errorMessage });
        } else {
            const newUser = await User.create({ id_user, id_daerah, nama, email, password });

            res.status(201).json({
                data: newUser,
                success: "User baru ditambahkan",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id_daerah, nama, email, password } = req.body;
        const id_user = req.params.id_user;

        const existingUser = await User.findByPk(id_user);
        if (!existingUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await existingUser.update({ id_daerah, nama, email, password });
        res.status(201).json({ success: "User diupdate", user: existingUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;

        const existingUser = await User.findByPk(id_user);
        if (!existingUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await existingUser.destroy();
        res.status(201).json({ success: `${existingUser.nama} telah dihapus` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const getUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;

        const existingUser = await User.findByPk(id_user);
        if (!existingUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.status(201).json(existingUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUser,
};
const Transaksi = require('../Models/TransaksiModel');

const getAllTransaksi = async (req, res) => {
    try {
        const transaksis = await Transaksi.findAll();
        res.status(200).json(transaksis);
    } catch (error) {
        console.error(error.message);
        res.status(501).json(error.message);
    }
};

const createTransaksi = async (req, res) => {
    try {

        const { id_transaksi, id_kategori, id_jenis, id_aset, tanggal, jumlah, note } = req.body;
        const id_user = req.user.id_user;

        const errorMessage = !id_transaksi && !id_user && !id_kategori && !id_jenis && !id_aset && !tanggal && !jumlah && !note
            ? "ID Transaksi, ID User, ID Kategori, ID Jenis, ID Aset, Tanggal, Jumlah, dan Note tidak boleh kosong"
            : !id_transaksi
                ? "ID Transaksi tidak boleh kosong"
                : !id_user
                    ? "ID User tidak boleh kosong"
                    : !id_kategori
                        ? "ID Kategori tidak boleh kosong"
                        : !id_jenis
                            ? "ID Jenis tidak boleh kosong"
                            : !id_aset
                                ? "ID Aset tidak boleh kosong"
                                : !tanggal
                                    ? "Tanggal tidak boleh kosong"
                                    : !jumlah
                                        ? "Jumlah tidak boleh kosong"
                                        : !note
                                            ? "Note tidak boleh kosong"
                                            : null;

        if (errorMessage) {
            res.status(403).json({ error: errorMessage });
        } else {
  
            const newTransaksi = await Transaksi.create({ id_transaksi, id_user, id_kategori, id_jenis, id_aset, tanggal, jumlah, note });

            res.status(201).json({
                data: newTransaksi,
                success: "Transaksi baru ditambahkan",
            });
   
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const updateTransaksi = async (req, res) => {
    try {
        const { id_user, id_kategori, id_jenis, id_aset, tanggal, jumlah, note } = req.body;
        const id_transaksi = req.params.id_transaksi;

        const existingTransaksi = await Transaksi.findByPk(id_transaksi);
        if (!existingTransaksi) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }

        await existingTransaksi.update({ id_user, id_kategori, id_jenis, id_aset, tanggal, jumlah, note });
        res.status(201).json({ success: "Transaksi diupdate", transaksi: existingTransaksi });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const deleteTransaksi = async (req, res) => {
    try {
        const id_transaksi = req.params.id_transaksi;

        const existingTransaksi = await Transaksi.findByPk(id_transaksi);
        if (!existingTransaksi) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }

        await existingTransaksi.destroy();
        res.status(201).json({ success: `Transaksi ${existingTransaksi.id_transaksi} telah dihapus` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const getTransaksi = async (req, res) => {
    try {
        const id_transaksi = req.params.id_transaksi;

        const existingTransaksi = await Transaksi.findByPk(id_transaksi);
        if (!existingTransaksi) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }

        res.status(201).json(existingTransaksi);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

module.exports = {
    getAllTransaksi,
    createTransaksi,
    updateTransaksi,
    deleteTransaksi,
    getTransaksi,
};

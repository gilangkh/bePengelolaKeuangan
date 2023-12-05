
const Transaksi = require('../Models/TransaksiModel')

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

        const { id_kategori, id_jenis, id_aset, tanggal, jumlah, note } = req.body;
        const id_user = req.user.id_user;

        const errorMessage =  !id_kategori && !id_jenis && !id_aset && !tanggal && !jumlah && !note
            ? " ID User, ID Kategori, ID Jenis, ID Aset, Tanggal, Jumlah, dan Note tidak boleh kosong"
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
  
            const newTransaksi = await Transaksi.create({ id_user:id_user, id_kategori, id_jenis, id_aset, tanggal, jumlah, note });

            res.status(201).json({
                data: newTransaksi,
                success: "Transaksi baru ditambahkan",
            });
   
        }
    } catch (error) {
        console.error(error.message);
        console.log
        res.status(500).json({ error: "Terjadi kesalahan server"+ req.user.nama });
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

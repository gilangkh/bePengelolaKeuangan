const JenisTransaksi = require('../Models/JenisTransaksiModel');

const getAllJenisTransaksi = async (req, res) => {
    try {
        const jenisTransaksis = await JenisTransaksi.findAll();
        res.status(200).json(jenisTransaksis);
    } catch (error) {
        console.error(error.message);
        res.status(501).json(error.message);
    }
};

const createJenisTransaksi = async (req, res) => {
    try {
        const { id_jenis, nama } = req.body;

        const errorMessage = !id_jenis && !nama
            ? "ID Jenis dan Nama Jenis tidak boleh kosong"
            : !id_jenis
                ? "ID Jenis tidak boleh kosong"
                : !nama
                    ? "Nama Jenis tidak boleh kosong"
                    : null;

        if (errorMessage) {
            res.status(403).json({ error: errorMessage });
        } else {
            const newJenisTransaksi = await JenisTransaksi.create({ id_jenis, nama });

            res.status(201).json({
                data: newJenisTransaksi,
                success: "Jenis Transaksi baru ditambahkan",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const updateJenisTransaksi = async (req, res) => {
    try {
        const { nama } = req.body;
        const id_jenis = req.params.id_jenis;

        const existingJenisTransaksi = await JenisTransaksi.findByPk(id_jenis);
        if (!existingJenisTransaksi) {
            return res.status(404).json({ message: "Jenis Transaksi tidak ditemukan" });
        }

        await existingJenisTransaksi.update({ nama });
        res.status(201).json({ success: "Jenis Transaksi diupdate", jenis_transaksi: existingJenisTransaksi });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const deleteJenisTransaksi = async (req, res) => {
    try {
        const id_jenis = req.params.id_jenis;

        const existingJenisTransaksi = await JenisTransaksi.findByPk(id_jenis);
        if (!existingJenisTransaksi) {
            return res.status(404).json({ message: "Jenis Transaksi tidak ditemukan" });
        }

        await existingJenisTransaksi.destroy();
        res.status(201).json({ success: `${existingJenisTransaksi.nama} telah dihapus` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const getJenisTransaksi = async (req, res) => {
    try {
        const id_jenis = req.params.id_jenis;

        const existingJenisTransaksi = await JenisTransaksi.findByPk(id_jenis);
        if (!existingJenisTransaksi) {
            return res.status(404).json({ message: "Jenis Transaksi tidak ditemukan" });
        }

        res.status(201).json(existingJenisTransaksi);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

module.exports = {
    getAllJenisTransaksi,
    createJenisTransaksi,
    updateJenisTransaksi,
    deleteJenisTransaksi,
    getJenisTransaksi,
};

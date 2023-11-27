const Kategori = require('../Models/KategoriModel');

const getAllKategori = async (req, res) => {
    try {
        const kategoris = await Kategori.findAll();
        res.status(200).json(kategoris);
    } catch (error) {
        console.error(error.message);
        res.status(501).json(error.message);
    }
};

const createKategori = async (req, res) => {
    try {
        const { id_kategori, id_jenis, nama } = req.body;

        const errorMessage = !id_kategori && !id_jenis && !nama
            ? "ID Kategori, ID Jenis, dan Nama Kategori tidak boleh kosong"
            : !id_kategori
                ? "ID Kategori tidak boleh kosong"
                : !id_jenis
                    ? "ID Jenis tidak boleh kosong"
                    : !nama
                        ? "Nama Kategori tidak boleh kosong"
                        : null;

        if (errorMessage) {
            res.status(403).json({ error: errorMessage });
        } else {
            const newKategori = await Kategori.create({ id_kategori, id_jenis, nama });

            res.status(201).json({
                data: newKategori,
                success: "Kategori baru ditambahkan",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const updateKategori = async (req, res) => {
    try {
        const { id_jenis, nama } = req.body;
        const id_kategori = req.params.id_kategori;

        const existingKategori = await Kategori.findByPk(id_kategori);
        if (!existingKategori) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        await existingKategori.update({ id_jenis, nama });
        res.status(201).json({ success: "Kategori diupdate", kategori: existingKategori });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const deleteKategori = async (req, res) => {
    try {
        const id_kategori = req.params.id_kategori;

        const existingKategori = await Kategori.findByPk(id_kategori);
        if (!existingKategori) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        await existingKategori.destroy();
        res.status(201).json({ success: `${existingKategori.nama} telah dihapus` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const getKategori = async (req, res) => {
    try {
        const id_kategori = req.params.id_kategori;

        const existingKategori = await Kategori.findByPk(id_kategori);
        if (!existingKategori) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        res.status(201).json(existingKategori);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

module.exports = {
    getAllKategori,
    createKategori,
    updateKategori,
    deleteKategori,
    getKategori,
};

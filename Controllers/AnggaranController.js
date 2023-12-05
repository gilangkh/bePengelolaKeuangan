const Anggaran = require('../Models/AnggaranModel');

const getAllAnggaran = async (req, res) => {
    try {
        const anggarans = await Anggaran.findAll();
        res.status(200).json(anggarans);
    } catch (error) {
        console.error(error.message);
        res.status(501).json(error.message);
    }
};

const createAnggaran = async (req, res) => {
    try {
        const { id_user, nama, nilai } = req.body;

        const errorMessage = !id_user && !nama && !nilai
            ? "ID Anggaran, ID User, Nama Anggaran, dan Nilai tidak boleh kosong"
                : !id_user
                    ? "ID User tidak boleh kosong"
                    : !nama
                        ? "Nama Anggaran tidak boleh kosong"
                        : !nilai
                            ? "Nilai tidak boleh kosong"
                            : null;

        if (errorMessage) {
            res.status(403).json({ error: errorMessage });
        } else {
            const newAnggaran = await Anggaran.create({ id_anggaran, id_user, nama, nilai });

            res.status(201).json({
                data: newAnggaran,
                success: "Anggaran baru ditambahkan",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const updateAnggaran = async (req, res) => {
    try {
        const { id_user, nama, nilai } = req.body;
        const id_anggaran = req.params.id_anggaran;

        const existingAnggaran = await Anggaran.findByPk(id_anggaran);
        if (!existingAnggaran) {
            return res.status(404).json({ message: "Anggaran tidak ditemukan" });
        }

        await existingAnggaran.update({ id_user, nama, nilai });
        res.status(201).json({ success: "Anggaran diupdate", anggaran: existingAnggaran });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const deleteAnggaran = async (req, res) => {
    try {
        const id_anggaran = req.params.id_anggaran;

        const existingAnggaran = await Anggaran.findByPk(id_anggaran);
        if (!existingAnggaran) {
            return res.status(404).json({ message: "Anggaran tidak ditemukan" });
        }

        await existingAnggaran.destroy();
        res.status(201).json({ success: `${existingAnggaran.nama} telah dihapus` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const getAnggaran = async (req, res) => {
    try {
        const id_anggaran = req.params.id_anggaran;

        const existingAnggaran = await Anggaran.findByPk(id_anggaran);
        if (!existingAnggaran) {
            return res.status(404).json({ message: "Anggaran tidak ditemukan" });
        }

        res.status(201).json(existingAnggaran);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

module.exports = {
    getAllAnggaran,
    createAnggaran,
    updateAnggaran,
    deleteAnggaran,
    getAnggaran,
};

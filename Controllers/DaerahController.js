const Daerah = require('../Models/DaerahModel');

const getAllDaerah = async (req, res) => {
    try {
        const daerahs = await Daerah.findAll();
        res.status(200).json(daerahs);
    } catch (error) {
        console.error(error.message);
        res.status(501).json(error.message);
    }
};

const createDaerah = async (req, res) => {
    try {
        const { id_daerah, nama_daerah, umr } = req.body;

        const errorMessage = !id_daerah && !nama_daerah && !umr
            ? "ID Daerah, Nama Daerah, dan UMR tidak boleh kosong"
            : !id_daerah
                ? "ID Daerah tidak boleh kosong"
                : !nama_daerah
                    ? "Nama Daerah tidak boleh kosong"
                    : !umr
                        ? "UMR tidak boleh kosong"
                        : null;

        if (errorMessage) {
            res.status(403).json({ error: errorMessage });
        } else {
            const newDaerah = await Daerah.create({ id_daerah, nama_daerah, umr });

            res.status(201).json({
                data: newDaerah,
                success: "Daerah baru ditambahkan",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const updateDaerah = async (req, res) => {
    try {
        const { nama_daerah, umr } = req.body;
        const id_daerah = req.params.id_daerah;

        const existingDaerah = await Daerah.findByPk(id_daerah);
        if (!existingDaerah) {
            return res.status(404).json({ message: "Daerah tidak ditemukan" });
        }

        await existingDaerah.update({ nama_daerah, umr });
        res.status(201).json({ success: "Daerah diupdate", daerah: existingDaerah });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const deleteDaerah = async (req, res) => {
    try {
        const id_daerah = req.params.id_daerah;

        const existingDaerah = await Daerah.findByPk(id_daerah);
        if (!existingDaerah) {
            return res.status(404).json({ message: "Daerah tidak ditemukan" });
        }

        await existingDaerah.destroy();
        res.status(201).json({ success: `${existingDaerah.nama_daerah} telah dihapus` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const getDaerah = async (req, res) => {
    try {
        const id_daerah = req.params.id_daerah;

        const existingDaerah = await Daerah.findByPk(id_daerah);
        if (!existingDaerah) {
            return res.status(404).json({ message: "Daerah tidak ditemukan" });
        }

        res.status(201).json(existingDaerah);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

module.exports = {
    getAllDaerah,
    createDaerah,
    updateDaerah,
    deleteDaerah,
    getDaerah,
};

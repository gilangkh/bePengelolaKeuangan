const User = require('../Models/UserModel');
const bcrypt = require('bcrypt')

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
    /* 
    {
"id_user":"qwe",
"id_daerah":"SUMBAR",
"nama":"gilang",
"email":"gilang@gmail.com",
"password":"gilang123"
}
*/
    try {
        let { id_user, id_daerah, nama, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10)

        let errorMessage = !id_user && !id_daerah && !nama && !email && !password
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
            const newUser = await User.create({ id_user, id_daerah, nama, email, password:hashedPassword });

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
        const {  nama,  } = req.body;
        const id_user = req.params.id_user;

        const existingUser = await User.findByPk(id_user);
        if (!existingUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await existingUser.update({  nama, });
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

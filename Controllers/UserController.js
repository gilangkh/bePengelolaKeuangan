const { Model } = require('sequelize');
const Daerah = require('../Models/DaerahModel');
const Kategori = require('../Models/KategoriModel');
const Aset = require('../Models/AsetModel');
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt')

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        console.log (users)
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
        let {  id_daerah, nama, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10)

        const existingUser = await User.findOne({where:{email:email}})
        if(existingUser){
            return res.status(403).json({error:"email sudah terdaftar"})
        }
        const existingAddress = await Daerah.findOne({where:{nama_daerah:id_daerah}})
   
        if(existingAddress){
            id_daerah = existingAddress.id_daerah
        }
        
        let errorMessage =  !id_daerah && !nama && !email && !password
            ? "ID , ID Daerah, Nama, Email, dan Password tidak boleh kosong"
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
            const newUser = await User.create({  id_daerah, nama, email, password:hashedPassword });
            if(newUser !=null||undefined){
                const modkategories = await  Kategori.bulkCreate([
                    {   
                        id_user:newUser.id_user,
                        id_jenis:1,
                        nama : "gaji" 
                    },{
                        id_user:newUser.id_user,
                        id_jenis:2,
                        nama : "makkanan" 
                    }
                ])
                const modAset = await Aset.bulkCreate([
                    {   
                        id_user:newUser.id_user,
                        nama : "TUNAI" 
                    },{
                        id_user:newUser.id_user,
                        nama : "BANK" 
                    }
                ]
                    )
                    res.status(201).json({
                        data: newUser,
                        iclude :[{
                            kategori: modkategories,
                            aset : modAset
                        }],
                        success: "User baru ditambahkan",
                    });
            }
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

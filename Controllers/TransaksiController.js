
const {Transaksi,Kategori,Aset,JenisTransaksi }= require('../Models/relation')


const getAllTransaksi = async (req, res) => {
    try {
        const transaksis = await Transaksi.findAll({
            where:{
                id_user:req.user.id_user
            },
            include:[{
                model:Kategori,
                attributes:['nama']
            },{
                model:Aset,
                attributes:['nama']
            },{
                model:JenisTransaksi,
                attributes:['nama']
            }
        ]});
        res.status(200).json(transaksis);
    } catch (error) {
        console.error(error.message);
        res.status(501).json(error.message);
    }
};

const createTransaksi = async (req, res) => {
    try {

        let { id_kategori, id_jenis, id_aset, tanggal, jumlah, note } = req.body;
        let id_user = req.user.id_user;

        let kategori  = await Kategori.findOne({where:{nama:id_kategori}})
        let aset  = await Aset.findOne({where:{nama:id_aset}})
        let jenis = await JenisTransaksi.findOne({where:{nama:id_jenis}})

        if(kategori){
            id_kategori = kategori.id_kategori
        }
        if(aset){
            id_aset = aset.id_aset
        }
        if(jenis){
            id_jenis= jenis.id_jenis
        }

        let errorMessage =  !id_kategori && !id_jenis && !id_aset && !tanggal && !jumlah && !note
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
        res.status(500).json({ error: "Terjadi kesalahan server"+ error.message });
    }
};

const updateTransaksi = async (req, res) => {
    try {
        let { id_user, id_kategori, id_aset, tanggal, jumlah, note } = req.body;
        let id_transaksi = req.params.id_transaksi;

        let existingTransaksi = await Transaksi.findByPk(id_transaksi);
        if (!existingTransaksi) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }
        let kategori  = await Kategori.findOne({where:{nama:id_kategori}})
        let aset  = await Aset.findOne({where:{nama:id_aset}})

        if(kategori){
            id_kategori = kategori.id_kategori
        }
        if(aset){
            id_aset = aset.id_aset
        }
   
        await existingTransaksi.update({ id_user, id_kategori, id_jenis, id_aset, tanggal, jumlah, note });
        res.status(201).json({ success: "Transaksi diupdate", transaksi: existingTransaksi });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" + error.message});
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

        const existingTransaksi = await Transaksi.findOne({
            where:{
                id_transaksi
            },
            include:[{
                model:Kategori,
                attributes:['nama']
            },{
                model:Aset,
                attributes:['nama']
            },{
                model:JenisTransaksi,
                attributes:['nama']
            }
        ]
        });
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

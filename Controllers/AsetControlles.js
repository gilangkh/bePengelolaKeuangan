const Aset = require('../Models/AsetModel')

const getAllAset = async (req,res)=>{
    try {
        const Asets  = await Aset.findAll() 
        res.status(200).json(Asets)
    } catch (error) {
        console.log(error.message)
        res.status(501).json(error.message)
    }
}

const createAset = async (req, res) => {
    try {
        const { id_aset, nama } = req.body;

        const errorMessage = !id_aset&&!nama?"id aset dan nama tidak boleh kosong" :!id_aset ? "id aset tidak boleh kosong" : !nama ? "nama tidak boleh kosong" : null;

        if (errorMessage) {
            res.status(403).json({ error: errorMessage });
        } else {
            const newAset = await Aset.create({ id_aset, nama });

            res.status(201).json({
                data: newAset,
                success: "aset baru ditambahkan",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

const updateAset = async (req,res)=>{
    try {
        
        const data = req.body
        const id_aset = req.params.id_aset

        const existingAset = await Aset.findByPk(id_aset)
        if(!existingAset){
          return  res.status(404).json({message:"aset tidak ditemukan"})
        }
        
        existingAset.nama = data.nama

        await existingAset.save()
        let response ={
            success:"aset di update",
            aset : existingAset
        }
        res.status(201).json(response)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" }); 
    }
}

const deleteAset = async (req,res)=>{
    try {
        const id_aset = req.params.id_aset

        const existingAset = await Aset.findByPk(id_aset)
        if(!existingAset){
          return  res.status(404).json({message:"aset tidak ditemukan"})
        }
        existingAset.destroy()

        let response ={
            success :`${existingAset.nama} telah di hapus`
        }

        res.status(201).json(response)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" }); 
    }
}

const getAset = async (req,res)=>{
    try {
        const id_aset = req.params.id_aset

        const existingAset = await Aset.findByPk(id_aset)
        if(!existingAset){
          return  res.status(404).json({message:"aset tidak ditemukan"})
        }

        res.status(201).json(existingAset) 
    } catch (error) {
        
    }
}
module.exports={
    getAllAset,createAset, updateAset,deleteAset,getAset
}
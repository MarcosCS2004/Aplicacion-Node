import {getConnection} from "./../database/database"

const getLigas = async(req,res)=>{
    try{
    const connection= await getConnection();
        const result = await connection.query("SELECT * FROM liga");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
    
};

const addLiga = async(req, res) => {
    try {
        console.log(req.body)
        const { liga} = req.body;

        if (!liga) {
            return res.status(400).json({ message: "Requisitos inválidos" });
        }

        const ligaNueva = { liga  };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO liga SET ?", ligaNueva);

        return res.status(200).json({ message: "Liga añadida correctamente" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Error interno del servidor");
    }
};


const getLiga = async(req,res)=>{
    try{
        const{id}=req.params;
    const connection= await getConnection();
        const result = await connection.query("SELECT * FROM liga WHERE id = ?", id)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
    
};


const deleteLiga = async(req,res)=>{
    try{
        const{id}=req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM liga WHERE id = ?", id)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
    
};

export const methods = {
    getLigas,
    addLiga,
    getLiga,
    deleteLiga
}
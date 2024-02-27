import {getConnection} from "./../database/database"



const getEquipos = async(req,res)=>{
    try{
    const connection= await getConnection();
        const result = await connection.query("SELECT * FROM equipo");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
    
};

const getEquiposOrdenados = async(req,res)=>{
    try{
    const connection= await getConnection();
        const result = await connection.query("SELECT * FROM equipo ORDER BY anio_de_fundacion");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
    
}

const getEquiposPorLiga = async (req, res) => {
    try {
        const { liga } = req.params;
        const connection = await getConnection();
        const ligaEquipo = await connection.query("SELECT id FROM liga WHERE liga = ?", [liga]); 
        const result = await connection.query("SELECT * FROM equipo WHERE liga_id = ?", ligaEquipo[0].id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addEquipo = async (req, res) => {
    try {
        const { nombre, anio_de_fundacion, liga_id } = req.body;

        if (!nombre || !anio_de_fundacion || !liga_id) {
            return res.status(400).json({ message: "Requisitos inválidos" });
        }


        const equipo = { nombre, anio_de_fundacion, imagen, foto, liga_id };
        const connection = await getConnection();
        const [count] = await connection.query('SELECT COUNT(*) FROM liga WHERE ID = ?', [liga_id]);
        const countValue = count['COUNT(*)']; 
        console.log(countValue);

        if (countValue !== 0) {
            const result = await connection.query("INSERT INTO equipo SET ?", equipo);
            return res.status(200).json({ message: "Equipo añadido correctamente" });
        } else {
            return res.status(400).json({ message: "Liga inexistente" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Error interno del servidor");
    }
};



const getEquipo = async(req,res)=>{
    try{
        const{id}=req.params;
    const connection= await getConnection();
        const result = await connection.query("SELECT * FROM equipo WHERE id = ?", id)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
    
};

const updateEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, anio_de_fundacion, liga_id } = req.body;

        if (id === undefined || nombre === undefined || anio_de_fundacion === undefined || liga_id === undefined) {
            return res.status(400).json({ message: "Requisitos inválidos" });
        }

        const foto = req.file;
        saveImage(foto);
        const imagen =  foto.originalname;

        const equipo = { nombre, anio_de_fundacion, imagen, foto, liga_id };
        const connection = await getConnection();
        const result = await connection.query("UPDATE equipo SET ? WHERE id = ?", [equipo, id]);
        const [count] = await connection.query('SELECT COUNT(*) FROM liga WHERE ID = ?', [liga_id]);
        const countValue = count['COUNT(*)']; 
        console.log(countValue);
        if (countValue !== 0) {
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Equipo actualizado correctamente" });
        } else {
            return res.status(404).json({ message: "No se encontró ningún equipo con el ID proporcionado" });
        }
        }else{
            return res.status(400).json({ message: "Liga inexistente" });
        }   
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Error interno del servidor");
    }
};


const deleteEquipo = async(req,res)=>{
    try{
        const{id}=req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM equipo WHERE id = ?", id)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
    
};



export const methods = {
    getEquipos,
    getEquiposOrdenados,
    addEquipo,
    getEquipo,
    deleteEquipo,
    updateEquipo,
    getEquiposPorLiga
}

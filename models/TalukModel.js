import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_taluk = db.define('d_taluk',{
    Taluk_Name:{
        type: DataTypes.STRING(20)
    },
    Taluk_Surname:{
        type: DataTypes.STRING(6)
    },
    Dist_Surname:{
        type: DataTypes.STRING(6)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default d_taluk;

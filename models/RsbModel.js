import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_rsb = db.define('d_rsb',{
    RSB_Id:{
        type: DataTypes.TINYINT,
        autoIncrement : true,
        primaryKey : true
    },
     RSB_Name:{
        type: DataTypes.STRING(30)
    },
    RSB_Surname:{
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

export default d_rsb;

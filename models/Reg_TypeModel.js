import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_reg_type = db.define('d_reg_type',{
    Reg_Id:{
        type: DataTypes.TINYINT,

    },
    Reg_Name:{
        type: DataTypes.STRING(20)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default d_reg_type;

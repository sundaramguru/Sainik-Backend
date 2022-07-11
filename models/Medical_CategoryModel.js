import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_medical_category = db.define('d_medical_category',{

    Service_Id:{
        type: DataTypes.TINYINT
    },
    Discharge_Med_Cat:{
        type: DataTypes.STRING(10)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default d_medical_category;

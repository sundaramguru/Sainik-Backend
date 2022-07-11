import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_record_office_army = db.define('d_record_office_army',{
    Corps_Name:{
        type: DataTypes.STRING(25)
    },
    Record_Office_Name:{
        type: DataTypes.STRING(25)
    },
    Record_Office_Location:{
        type: DataTypes.STRING(35)
    },
    Dist_Surname:{
        type: DataTypes.STRING(6)
    },
    Record_Office_Mail:{
        type: DataTypes.STRING(50)
    },
    Record_Office_Mobile:{
        type: DataTypes.STRING(15)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default d_record_office_army;

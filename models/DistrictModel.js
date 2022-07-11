import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_district = db.define('d_district',{
    Dist_Surname:{
        type: DataTypes.STRING(6)
    },
     District:{
        type: DataTypes.STRING(50)
    },
     State_Surname:{
        type: DataTypes.STRING(3)
    },
    ZSB_Id:{
        type: DataTypes.TINYINT
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});
(async () => {
    await db.sync();
})();

export default d_district;

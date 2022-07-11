import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_esm = db.define('u_esm',{
    Service_No:{
        type: DataTypes.STRING(30)
    },
    ESM_No:{
        type: DataTypes.STRING(30)
    }
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default u_esm;

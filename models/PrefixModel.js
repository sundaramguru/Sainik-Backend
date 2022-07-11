import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_prefix = db.define('d_prefix',{

    Service_Id:{
        type: DataTypes.TINYINT
    },
    Prefix:{
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

export default d_prefix;

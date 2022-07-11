import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_branch = db.define('d_branch',{

    Bank_Id:{
        type: DataTypes.TINYINT
    },
    Branch:{
        type: DataTypes.STRING(60)

    },


},{ createdAt : false,
    updatedAt : false,
    freezeTableName:true
});



(async () => {
    await db.sync();
})();

export default d_branch;

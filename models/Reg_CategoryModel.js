import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_reg_category = db.define('d_reg_category',{
    Reg_Id:{
        type: DataTypes.TINYINT
    },
    Rank_Category:{
        type: DataTypes.STRING(30)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default d_reg_category;

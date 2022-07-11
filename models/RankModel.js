import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_rank = db.define('d_rank',{
    Rank_Category_Id:{
        type: DataTypes.TINYINT
    },
    Service_Id:{
        type: DataTypes.TINYINT
    },
    Rank_Name:{
        type: DataTypes.STRING(35)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default d_rank;

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_trade = db.define('d_trade',{
    Service_Id:{
        type: DataTypes.TINYINT
    },
    Group_Name:{
        type: DataTypes.STRING(1)
    },
    Trade_Name:{
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

export default d_trade;

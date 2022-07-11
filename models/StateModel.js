import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_state = db.define('d_state',{
    RSB_Id:{
        type: DataTypes.TINYINT
    },
    State_Surname:{
        type: DataTypes.STRING(3)
    },
    State:{
        type: DataTypes.STRING(25)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default d_state;

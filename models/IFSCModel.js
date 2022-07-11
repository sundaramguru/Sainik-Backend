import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_ifsc = db.define('d_ifsc',{

    Bank_Id:{
        type: DataTypes.TINYINT
    },
    Branch_Id:{
        type: DataTypes.TINYINT
    },
    IFSC:{
        type: DataTypes.STRING(15)
    },

},{ createdAt : false,
    updatedAt : false,
    freezeTableName:true
});



(async () => {
    await db.sync();
})();

export default d_ifsc;

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_bank = db.define('d_bank',{

    Bank_Name:{
        type: DataTypes.STRING(60)
    },
    Branch:{
        type: DataTypes.STRING(60)

    },

    IFSC:{
        type: DataTypes.STRING(15)
    },

},{ createdAt : false,
    updatedAt : false,
    freezeTableName:true
});



(async () => {
    await db.sync({ alter: true });
})();

export default d_bank;

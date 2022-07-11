import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_user_reg = db.define('u_user_reg',{
    Name:{
        type: DataTypes.STRING
    },
    Service_No:{
        type: DataTypes.STRING
    },
    Mail_Id:{
        type: DataTypes.STRING
    },
    Mobile:{
        type: DataTypes.STRING
    },
    Password:{
        type: DataTypes.STRING
    },
    Reg_Type:{
        type: DataTypes.STRING
    },
    Status:{
        type: DataTypes.STRING,
        defaultValue: "Not Submitted"
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    createdAt:{
      type :DataTypes.DATEONLY,
      allowNull:false,
      defaultValue:Sequelize.NOW
    },

},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_user_reg;

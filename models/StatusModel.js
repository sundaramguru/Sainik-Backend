import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_status_details = db.define('u_status_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Reg_Type:{
      type: DataTypes.STRING
    },
    Name:{
        type: DataTypes.STRING
    },
    User_Status:{
        type: DataTypes.STRING,
        defaultValue: "Submitted"
    },
    Clerk:{
        type: DataTypes.STRING,
        defaultValue: "Pending"
    },
    Superintendent:{
        type: DataTypes.STRING,
        defaultValue: "Awaiting"
    },
    Director:{
        type: DataTypes.STRING,
        defaultValue: "Awaiting"
    },
    C_Remark:{
      type: DataTypes.STRING,
      defaultValue: "NIL"
    },
    S_Remark:{
      type: DataTypes.STRING,
      defaultValue: "NIL"
    },
    D_Remark:{
      type: DataTypes.STRING,
      defaultValue: "NIL"
    },
    Board_Name:{
      type: DataTypes.STRING
    }


},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_status_details;

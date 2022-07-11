import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_Sfile_details = db.define('u_Sfile_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Spouse_Name:{
        type: DataTypes.STRING
    },
    Img:{
        type: DataTypes.STRING
    },
    PPO:{
      type: DataTypes.STRING
    },
    Adhar:{
        type: DataTypes.STRING
    },
    PAN:{
        type: DataTypes.STRING
    },
    ECHS:{
        type: DataTypes.STRING
    },
    Voter:{
        type: DataTypes.STRING
    },
    User_Status:{
        type: DataTypes.STRING,
        defaultValue: "Not Submitted"
    },
    Registered_date:{
      type :DataTypes.DATEONLY,
      allowNull:false,
      defaultValue:Sequelize.NOW
    },
},{
    createdAt:false,
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_Sfile_details;

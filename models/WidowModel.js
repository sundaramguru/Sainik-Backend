import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_widow_details = db.define('u_widow_details',{

    Service_No:{
        type: DataTypes.STRING(12)
    },
    Widow_Reg_No:{
        type: DataTypes.STRING(12)
    },
    Family_Pension:{
        type: DataTypes.STRING(6)
    },

    Death_Date:{
        type: DataTypes.STRING
    },
    Death_Nature:{
        type: DataTypes.STRING(35)
    },
    ESM_No:{
      type: DataTypes.STRING(10)
    },
    User_Status:{
        type: DataTypes.STRING,
        defaultValue: "Submitted"
    },
      Registered_date:{
      type :DataTypes.DATEONLY,
      allowNull:false,
      defaultValue:Sequelize.NOW
    },
},{
  createdAt:false,
    updatedAt : false,
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_widow_details;

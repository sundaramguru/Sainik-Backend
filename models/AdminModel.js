import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admin = db.define('Admin_reg',{
    name:{
        type: DataTypes.STRING
    },
    service_no:{
        type: DataTypes.STRING
    },
    board:{
      type: DataTypes.STRING
    },
    board_name:{
      type: DataTypes.STRING
    },
    designation:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    mobile:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default Admin;

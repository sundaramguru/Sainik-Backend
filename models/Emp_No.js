import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_emp = db.define('u_emp',{
    Service_No:{
        type: DataTypes.STRING(30)
    },
    Emp_No:{
        type: DataTypes.STRING(30)
    }
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default u_emp;

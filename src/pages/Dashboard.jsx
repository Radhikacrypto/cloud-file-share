
import DashboardLayout from "../layout/DashboardLayout";

import {useAuth} from "@clerk/clerk-react";
import {useContext, useEffect, useState} from "react";

const Dashboard=()=>{

   const {getToken} = useAuth();
   useEffect(()=>{
      const displayToken = async()=>{
         const token = await getToken();
         console.log(token)
      }
      displayToken();
   },[]);
    return(
       <DashboardLayout activeMenu="Dashboard">
         <div>
           Dashboar Conteng
          </div>
       </DashboardLayout>
    )
}

export default Dashboard;
import { Suspense, useEffect } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { stringSearch, useOutsideClicker } from "../utils/helper";

export const DashboardHeader = forwardRef(({ title }, ref) => {
  const allMenus = JSON.parse(localStorage.getItem("menu") || "[]")
    .map((d) =>
      !!d.sub_module
        ? d.sub_module.map((d) => ({
          name: d.sub_module_name_en,
          link: d.page_name,
        }))
        : { name: d.module_name_en, link: d.page_name }
    )
    .flat();
  const wraperRef = useRef(null); 
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
 


  useOutsideClicker(wraperRef, () => {
    setOpen(false); 
  });


 


  return (
   <>
    <Suspense>
     
    </Suspense>
   </>
  );
});

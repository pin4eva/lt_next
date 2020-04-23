import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import style from "./style.module.scss";
import Dashboard from "../../layout/Dasboard";

const AnyPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(typeof window);
  });

  console.log(router);
  return (
    <Dashboard>
      <div className={style.text}>
        <h1>Any page</h1>
        <p className="text-center">this is a test</p>
        <Button variant="outlined">button</Button>
      </div>
    </Dashboard>
  );
};

export default AnyPage;

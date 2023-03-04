import { useEffect, useState } from "react";
import { Subject } from "@/types/subject.type";
import ContentComponent from "./components/content";
import SideNavigatorComponent from "./components/side-navgator";
import SideMenuComponent from "./components/sidemenu";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { TableHeader } from "./type";
import { Exercise } from "@/types/exercise.type";
import { Lesson } from "@/types/lesson.type";
import { Content } from "@/types/content.type";
import useSWR from "swr";
export default function DashboardPage() {
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const {
    data = [{ name: "#", key: "pos" }],
    error,
    isLoading,
  } = useSWR("/api/" + page, async () => {
    return await fetch("/api/" + page).then((res) => res.json().then());
  });
  const header = [
    { name: "#", key: "pos" },
    ...Object.keys(data?.[0]).map((e) => ({ name: e, key: e })),
    ,
  ];
  return (
    <>
      <main className={style["dashboard-layout"]}>
        <SideMenuComponent />
        <section className={style["dashboard-content-layout"]}>
          <div className={style["dashboard-content-grid-layout"]}>
            <SideNavigatorComponent></SideNavigatorComponent>
            <section className={style["dashboard-nav-and-table"]}>
              <div className="navbar bg-base-100 border-solid border-[1px] border-primary">
                <a className="btn btn-ghost normal-case text-xl">
                  {router.query.page}
                </a>
              </div>
              {isLoading ? (
                <>
                  <div
                    className="radial-progress  animate-spin"
                    style={{ "--value": 80 }}
                  >
                  
                  </div>
                </>
              ) : (
                <ContentComponent header={header} data={data} />
              )}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
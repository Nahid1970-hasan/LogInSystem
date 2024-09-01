import { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import { BodyContent } from "../components/style/BodyContent_styled"
import { DashboardHeader } from "./DashboardHeader"

export const Layout = () => {
    const sliderRef = useRef(null);
    const bodyRef = useRef(null);



    return (
        <>
            <BodyContent ref={bodyRef}>
                <DashboardHeader ref={sliderRef} />
                <main>
                    <Outlet />
                </main>
            </BodyContent>
        </>)
}
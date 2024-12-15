import { Suspense } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ProducsTab } from "./Products/Tab";
import { SkeletonTab } from "./Products/Skeleton";

export const Structure = () =>{
  return(
    <div className="w-full max-w-4xl mx-auto">
        <Header />
        <div className="mx-3">
          <Suspense fallback={<SkeletonTab/>}>
            <ProducsTab/>
          </Suspense>
        </div>
        <Footer />
    </div>
  )
}

export default Structure;
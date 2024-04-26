import { StickyScroll } from "../components/AcernityUI/sticky_scroll_reveal";
import Navbar from "../components/navbar";
import {subject_list} from "../../data/data"


export default function SubjectList(){
        return(
          <div> 
              <Navbar/>
              <div  className="flex h-[90vh]">
                <StickyScroll content={subject_list} />  
              </div>
          </div>
        )
}
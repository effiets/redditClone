
import Header from "../components/Header/Header";
import Subreddits from "../components/Subreddits/Subreddits";
import {screen, render as rtlRender} from "@testing-library/react"
import store from '../store/index'
import { Provider } from "react-redux";




const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe("Header shows...", ()=> {
    test("logo title", ()=>{
        render(<Header />)
        expect(screen.getByText('Reddit')).toBeInTheDocument()
    })
    test("logo span", ()=>{
        render(<Header />)
        expect(screen.getByText("Clone")).toBeInTheDocument()
    })
})

describe("Fetching the", () =>{
    test("subreddit title", async ()=>{
        render(<Subreddits/>)
        await (() => screen.findByText("Subreddits"))
        expect(screen.getByText("Subreddits")).toBeInTheDocument()
    })

    test("loadingSpinner", async()=>{
        render(<Subreddits />)
       await(() => screen.findByRole('status'))
        expect(screen.getByRole('status')).toBeInTheDocument()
        
    })
})



           


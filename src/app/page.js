import Header from "@/app/components/ui/Header";
import NewNavbar from "@/app/components/ui/NewNavbar";
import FixedFooter from "@/app/components/ui/FixedFooter";
require('dotenv').config();


export default function Home() {
    return (

        <main style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80")`,
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}
            className="min-h-screen flex-col items-center justify-between p-0">
            <NewNavbar/>
            <Header/>
            <FixedFooter/>
         </main>
    )
}

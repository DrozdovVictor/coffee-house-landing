// Components
import Header from "./components/sections/Header"
import Hero from "./components/sections/Hero"
import Freshness from "./components/sections/Freshness"
import Assortment from "./components/sections/Assortment"
import Subscription from "./components/sections/Subscription"
import Delivery from "./components/sections/Delivery"
import LeadForm from "./components/sections/LeadForm"
import Footer from "./components/sections/Footer"
import MobileBar from "./components/sections/MobileBar"

function App() {
  return (
    <div className="paper-noise relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <div className="relative z-10">
        <Header />
        <main className="mt-16">
          <Hero />
          <Freshness />
          <Assortment />
          <Subscription />
          <Delivery />
          <LeadForm />
        </main>
        <Footer />
        <MobileBar />
      </div>
    </div>
  )
}

export default App


import './App.css'
import Card from './components/Card'
function App() {

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center gap-4">
          <header className="text-2xl font-bold">Project Ideas</header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card
            img = "https://tse2.mm.bing.net/th/id/OIP.YUkODQ3nJd91l0lQERhY2gHaEw?rs=1&pid=ImgDetMain&o=7&rm=3"
            projectTitle = "Solar Panel Installation"
            projectDescription = "A project to install solar panels on the rooftops to lower energy bills"
            projectCategory = "Energy"
            />
            <Card
            img = "https://img.freepik.com/premium-photo/spores-mushroom-farm_87720-62825.jpg"
            projectTitle = "Mushroom Cultivation"
            projectDescription = "A project to cultivate mushrooms in a controlled environment to lower food costs."
            projectCategory = "Food"
            />
            <Card
            img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYTmlVfINM799FU59CiQL3ve14whMBzbiBlA&s"
            projectTitle = "Worm Farm"
            projectDescription = "A project to cultivate worms in a controlled environment to lower fishing supplies costs."
            projectCategory = "Fishing"
            />
            <Card
            img = "https://www.artknappsurrey.com/uploads/content/fullsize/Tips%20on%20Choosing%20a%20Fruit%20Tree%20for%20Your%20Yard.jpg"
            projectTitle = "Backyard Fruit Tree Orchard"
            projectDescription = "A project to cultivate fruit trees in a backyard setting to lower food costs."
            projectCategory = "Food"
            />
            <Card 
            img = "https://gardenculturemagazine.com/wp-content/uploads/BODY-IMAGE-1200-x-700px-DIY-RAINWATER-march-2022-.jpg"
            projectTitle = "Rainwater Harvesting System"
            projectDescription = "A project to install a rainwater harvesting system to lower water bills."
            projectCategory = "Water"
            />
            <Card
            img = "https://www.thompsons-plants.co.uk/files/images/news/how-to-make-a-compost-bin-1000x667-62c2f5cf04ebc_n.jpg"
            projectTitle = "Compost Bin"
            projectDescription = "A project to build a compost bin to lower food waste and fertilizer costs."
            projectCategory = "Waste"
            />
            <Card
            img = "https://eu-images.contentstack.com/v3/assets/blt8eb3cdfc1fce5194/blt71d95acbf3b9cbfe/6621299f8b14a364c914016d/ve2cuy-homedc-470.jpg"
            projectTitle = "Home Data Center"
            projectDescription = "A project to build a home data center to eleminate monthly subscription costs."
            projectCategory = "Energy"
            />
            <Card
            img = "https://library.udel.edu/news/wp-content/uploads/sites/33/2019/09/SeattleBooks_edit.jpg"
            projectTitle = "Book Collection"
            projectDescription = "A project to build a home book collection"
            projectCategory = "Hobby"
            />
            <Card
            img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYbq9Q0STlihWDpVvc9ynOYy-QtXBshLEqQ&s"
            projectTitle = "Own Saltwater Fishing Rods"
            projectDescription = "Own saltwater fishing rods for fishing trips."
            projectCategory = "Hobby"
            />
            <Card
            img = "https://astropad.com/wp-content/uploads/2024/01/Wacom-Cintiq-16-.webp"
            projectTitle = "Wacom Cintiq 16"
            projectDescription = "A project to buy a Wacom Cintiq 16 to improve digital art creation."
            projectCategory = "Hobby"
            />
          </div>  
        </div>
      </div>
    </>
  )
}

export default App

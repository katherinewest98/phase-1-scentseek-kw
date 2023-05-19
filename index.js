const perfumeCollection = document.querySelector("#perfume-collection")
const searchInput = document.querySelector("[data-search]")

let perfumes = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  perfumes.forEach(perfume => {
    const isVisible = perfume.name.slice(0, value.length).toLowerCase() === value || perfume.brand.slice(0, value.length).toLowerCase() === value
    perfume.element.classList.toggle("hide", !isVisible)
  })
})

fetch("http://localhost:3000/perfumes")
  .then((resp) => resp.json())
  .then((data) => {
    perfumes = data.map(perfume => {
    const perfumeCard = document.createElement("div")
    perfumeCard.className = "card"

    const img = document.createElement("img")
    img.src = perfume.image
    img.className = "perfume-image"

    const p = document.createElement("p")
    p.textContent = perfume.brand.toUpperCase()
    p.className = "perfume-brand"

    const h2 = document.createElement("h2")
    h2.textContent = perfume.name
    h2.className = "perfume-name"

    const button = document.createElement("button")
    button.className = "add-btn"
    button.textContent = "Add to bag - "  + perfume.price

    perfumeCard.append(img)
    perfumeCard.append(p)
    perfumeCard.append(h2)
    perfumeCard.append(button)

    perfumeCollection.appendChild(perfumeCard)

    button.addEventListener("click", addToBag)

    function addToBag() {
          alert("This item has been added to your bag.")
          const items = document.querySelector(".items")
          items.textContent = parseInt(items.textContent) + 1
          
        }

    img.addEventListener("mouseover", changeImage)

    function changeImage(){
      img.src = perfume.mouseoverImage
    }

    img.addEventListener("mouseout", changeImageBack)

    function changeImageBack(){
      img.src = perfume.image
    }

    return {image: perfume.image, brand: perfume.brand, name: perfume.name, price: perfume.price, element: perfumeCard}
    })
  })
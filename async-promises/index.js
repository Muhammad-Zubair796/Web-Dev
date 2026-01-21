// Find our button and the container 'box'
const btn = document.getElementById("loadImagesBtn");
const container = document.getElementById("imageContainer");

// We use 'async' because we have to 'await' (wait) for the internet
btn.addEventListener("click", async function() {
    
    // Clear the container so it's empty every time we click
    container.innerHTML = "Loading...";

    // 1. The 3 URLs we want to fetch
    const img1 = "https://picsum.photos/id/1018/400/300"; // Valley
    const img2 = "https://picsum.photos/id/1015/400/300"; // River
    const img3 = "https://picsum.photos/id/1019/400/300"; // Mountains

    try {
        // 2. The Waiter: Promise.all waits until ALL fetches are done
        // This is the 'async' part - it pauses here until the data arrives
        const responses = await Promise.all([
            fetch(img1),
            fetch(img2),
            fetch(img3)
        ]);

        // Clear the "Loading..." text
        container.innerHTML = "";

        // 3. We put our links into a list so we can loop through them
        const imagesList = [img1, img2, img3];

        // 4. Create the elements and throw them into the container
        imagesList.forEach(url => {
            // Create a new <img> element (the box)
            const newImg = document.createElement("img");
            
            // Give the source to pick the image from that URL
            newImg.src = url;
            
            // Throw it into the parent container
            container.appendChild(newImg);
        });

    } catch (error) {
        container.innerHTML = "Something went wrong!";
        console.error(error);
    }
});